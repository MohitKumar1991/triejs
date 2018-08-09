var tickers = require('./tickers');
var Trie = require('../src/Trie');
var utils = require('../src/utils');
var TT = require('../src/optimizedtrie');

test('testing sizes of different tries', () => {
    var trie = new Trie();
    var otrie = new TT();
    for(var i=0;i<tickers.length;i++) {
         trie.put(tickers[i]);
         otrie.put(tickers[i]);
    }
    var sTrie = utils.jsonSize(trie);
    var sOTrie = utils.jsonSize(otrie);

    console.log('size of the trie is' +  sTrie + 'size of the oTrie is ' + sOTrie);
    expect(sOTrie).toBeLessThan(sTrie);
    // putting null so it doesn't leak - although it won't
  });
