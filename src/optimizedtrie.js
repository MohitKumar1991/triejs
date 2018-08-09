var topN = require('./topN');

function Trie(options){
    
}

function processWordForStore(word) {
    return word.toLowerCase();
}

function processWordForSearch(word){
    return word.toLowerCase();
}

function validateInput(word, payload, priority) {
    if(typeof word === 'object' || typeof payload !== 'number'|| typeof priority !== 'number') {
        console.log("Returning false from validate input", payload, priority);
        return false;
    }
    return true;
}

function encodeEndingString(dataArr){
    return dataArr.join(':');
}

function decodeEndingString(str){
    console.log('decoding '+ str);
    return str.split(':').map(s => parseInt(s));
}


// don't have an object payload for now
Trie.prototype.put = function(word, options){
    options = options || {};
    var payload = options.payload || -1;
    var priority = options.priority || 0;
    if(!validateInput(word, payload, priority)) {return false;}
    word = processWordForStore(word);
    payload = payload || -1;
    cur = this;
    var letters = word.split('');
    
    for ( var j = 0; j < letters.length; j++) {
        //check if letter exists
        var letter = letters[j];

        if(j === letters.length - 1) {
            if(cur.hasOwnProperty(letter)){
                cur[letter].$ = encodeEndingString([payload, priority]);
                if(priority > cur[letter]._ ||  typeof cur[letter]._ === 'undefined') {
                    cur[letter]._ = priority;
                }
            } else {
                cur[letter] = encodeEndingString([payload, priority]);
            }
        } else {
            // if letter exists go to that letter
            if(cur.hasOwnProperty(letter)){
                if(typeof cur[letter] !== 'object') {
                    // turn string node into an object
                    cur[letter] = { $:cur[letter] };
                    // set priority for this node
                    cur[letter]._ = decodeEndingString(cur[letter].$)[1]
                }
                if(priority > cur[letter]._ ||  typeof cur[letter]._ === 'undefined') {
                    cur[letter]._ = priority
                }
                cur = cur[letter];
            } else {
                cur[letter] = {};
                cur[letter]._ = priority;
                cur = cur[letter];
            }
        }
    }
}

Trie.prototype.findWords = function(prefix, limit) {
    let cur = this;
    limit = limit || 10;
    prefix = processWordForSearch(prefix);
    const letters = prefix.split('');
    for(let i=0;i<letters.length;i++){
        let letter = letters[i];
        if(typeof cur === 'object' && cur.hasOwnProperty(letter)) {
            cur = cur[letter];
        } else {
            return [];
        }
    }
    if(limit){
        var tn = new topN(limit);
        return this.getTopNWords(cur, prefix, limit, tn, []);
    } else {
        return this.getWordsinSubtree(cur, prefix);
    }
    
}

// the algorithm for this goes like this 
//

Trie.prototype.getTopNWords = function(root, rootPrefix, max, tN, results) {
    console.log("ROOT CALLED -", root);
   
    if(typeof root !== 'object') {
        const decoded = decodeEndingString(root);
        if(decoded[1] === tN.getTop(results.length)) {
            results.push({
                word: rootPrefix,
                value: decoded[0],
                priority: decoded[1]
            });
        }
    } else {

        if(root.hasOwnProperty('$')){
            const decoded = decodeEndingString(root.$);
            if(decoded[1] === tN.getTop(results.length)) {
                results.push({
                    word: rootPrefix,
                    value: decoded[0],
                    priority: decoded[1]
                });
            }
        }
        
        // this part is wrong - I need to go to the top first to the end
        let letters = Object.keys(root).filter(l => l!== '_' );
        
        // this is so the depth wise traversal is always from largest to smallest
        letters.sort(function(letter1, letter2) {
            var p1,p2;
            if(typeof root[letter1] === 'object'){
                p1 = root[letter1]._;
            } else {
                p1 = decodeEndingString(root[letter1])[1];
            }
            if(typeof root[letter2] === 'object'){
                p2 = root[letter2]._;
            } else {
                p2 = decodeEndingString(root[letter2])[1];
            }
            return p2 - p1;

        });

        const priorities = letters.map((letter) => {
            if(typeof root[letter] === 'object'){
                return root[letter]._;
            } else {
                return decodeEndingString(root[letter])[1];
            }
        });

        tN.updateN(priorities, results.length);

        for(let i=0;i<letters.length;i++) {
            let letter = letters[i];
            if((max - results.length) === 0){
                break;
            }
            if(typeof root[letter] === 'object') {
                if(tN.isInN(root[letter]._, results.length)){
                    this.getTopNWords(root[letter], rootPrefix + letter, max, tN, results);
                }
            } else {
                // end of letter
                let newPrefix = letter === '$' ? rootPrefix : rootPrefix + letter; // if the last letter was the one then just add that
                this.getTopNWords(root[letter], newPrefix, max, tN, results);
            }
        }

    }

    return results;

}



Trie.prototype.getWordsinSubtree = function(root, rootPrefix) {
    let results = [];
    let queue = [{
        prefix: rootPrefix,
        value: root
    }];
    if(typeof root!== 'object') {
        return [{
            word: rootPrefix,
            payload: root
        }];
    }
    while(queue.length) {
        let curNode = queue.shift();

        // remove $
        if(typeof curNode.value!== 'object') {

            results.push({
                word: curNode.prefix,
                payload: curNode.value
            });

        }  else {

            if(curNode.value.hasOwnProperty('$')) {
                results.push({
                    word: curNode.prefix,
                    payload: curNode.value.$
                });
            }

            let letters = Object.keys(curNode.value).filter(l => l!=='$' && l!== '_' );
        
            for(let i = 0;i < letters.length;i++) {
                queue.push({
                    prefix: curNode.prefix + letters[i],
                    value: curNode.value[letters[i]]
                });
            }

        }
    }

    return  results;

}

module.exports = Trie;