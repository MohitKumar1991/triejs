function Trie(key) {
    this.key = key;
    this.value;
    //children are merged with this object since collision is minimal
}

Trie.prototype.put = function (name, value) {

    var node = this,
        nameLength = name.length,
        i = 0,
        currentLetter;

    //if the node exists, make it current and proceed
    //if not, we create it, make it current and proceed
    for (i = 0; i < nameLength; i++) {
        currentLetter = name[i].toLowerCase();
        node = node[currentLetter] || (node[currentLetter] = new Trie(currentLetter));
    }
    node.value = value;
    node.n = name;

};

Trie.prototype.put_add = function (name, value) {

    var node = this,
        nameLength = name.length,
        i = 0,
        currentLetter;

    //if the node exists, make it current and proceed
    //if not, we create it, make it current and proceed
    for (i = 0; i < nameLength; i++) {
        currentLetter = name[i].toLowerCase();
        node = node[currentLetter] || (node[currentLetter] = new Trie(currentLetter));
    }
    if (!node.value)
        node.value = value;
    else if (typeof(node.value) == 'object' && typeof(value) == 'object')
        node.value = [node.value, value]
    else
        node.value = [node.value, value].join(',');
    node.name = name;

};

Trie.prototype.get = function (name) {

    var node = this,
        nameLength = name.length,
        i, node;

    //same idea, zip through the collection
    //in this case we break if we hit a dead end
    for (i = 0; i < nameLength; i++) {
        if (!(node = node[name[i].toLowerCase()])) break;
    }

    //only when the loop went over all letters will we find a value
    //if not, well, we don't find anything
    return (i === nameLength) ? node.value : 'not found';
};

Trie.prototype.getAutofill = function (name) {
    var node = this,
        nameLength = name.length,
        i, node;

    for (i = 0; i < nameLength; i++) {
        if (!(node = node[name[i].toLowerCase()])) break;
    }
    //found results
    if (i === nameLength) {
        return node.addValues([]);
    }
    else {
        return [];
    }

};

Trie.prototype.getAutofillObjs = function (name) {
    var node = this,
        nameLength = name.length,
        i, node;

    for (i = 0; i < nameLength; i++) {
        if (!(node = node[name[i].toLowerCase()])) break;
    }
    //found results
    if (i === nameLength) {
        return node.addValueObjs([]);
    }
    else {
        return [];
    }
};

Trie.prototype.addValues = function (array) {
    var arry = array;
    var check = ''
    var dict = this;
    if (this.name)
        arry.push(this.name);
    for (var key in dict) {
        if (dict[key] instanceof Trie) {
            dict[key].addValues(arry);
        }
    }
    return arry;

};
Trie.prototype.addValueObjs = function (array) {
    var arry = array;
    var check = ''
    var dict = this;
    if (this.name) {
        if (typeof(this.value) == 'object' && this.value.constructor == Array && typeof(this.value[0]) == 'object') {
            $.each(this.value, function (key, single_suggest) {
                arry.push({'name': this.term, 'val': single_suggest});
            });
        }
        else {
            arry.push({'name': this.name, 'val': this.value});
        }
    }
    for (var key in dict) {
        if (dict[key] instanceof Trie) {
            dict[key].addValueObjs(arry);
        }
    }
    return arry;

};

module.exports = Trie;