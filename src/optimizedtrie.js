function Trie(options){
    
}


function processWordForStore(word) {
    return word.toLowerCase();
}

function processWordForSearch(word){
    return word.toLowerCase();
}


Trie.prototype.put = function(word, payload){
    word = processWordForStore(word);
    payload = payload || 1;
    cur = this;
    var letters = word.split('');
    
    for ( var j = 0; j < letters.length; j++) {
        //check if letter exists
        var letter = letters[j];
        // if letter exists go to that letter
        if(!cur[letter] && j!== letters.length - 1){
            cur[letter] = {};
            cur = cur[letter];
        } else if(j === letters.length -1) {
            if(cur[letter]){
                cur[letter].$ = payload;
            } else {
                cur[letter] = { $: payload };
            }
            cur = cur[letter];
        } else {
            cur = cur[letter];
        }
    }
}

Trie.prototype.findWords = function(prefix) {
    let cur = this;
    prefix = processWordForSearch(prefix);
    const letters = prefix.split('');
    for(let i=0;i<letters.length;i++){
        let letter = letters[i];
        if(cur[letter]) {
            cur = cur[letter];
        } else {
            return [];
        }
    }
    return this.getWordsinSubtree(cur, prefix);
}



Trie.prototype.getWordsinSubtree = function(root, rootPrefix) {
    let results = [];
    let queue = [{
        prefix: rootPrefix,
        value: root
    }];
    while(queue.length) {
        let curNode = queue.shift();
        // remove $
        let letters = Object.keys(curNode.value).filter(l => l!=='$');
        
        if(curNode.value.$) {
            results.push({
                word: curNode.prefix,
                payload: curNode.value.$
            });
        }  
        
        for(let i = 0;i < letters.length;i++) {
            queue.push({
                prefix: curNode.prefix + letters[i],
                value: curNode.value[letters[i]]
            });
        }
    }

    return  results;

}

module.exports = Trie;