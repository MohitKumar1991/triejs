var tickers = require('./tickers');
var Trie = require('../src/Trie');
var utils = require('../src/utils');
var oTrie = require('../src/optimizedtrie');


  test('inserting empty values', () => {
    var basicTickers = [ '', ' ', '     '];
    // var basicTickers = tickers;
    var trie = new oTrie();
    for(var i=0;i<basicTickers.length;i++){
        // console.log(basicTickers[i]);
        trie.put(basicTickers[i]);
        // console.log(JSON.stringify(trie));
    }
    expect(trie.findWords('').length).toBe(2);
    expect(trie.findWords('  ').length).toBe(1);

  });


  test('inserting consecutive values', () => {
    var basicTickers = [ 'd', 'de', 'del', 'delh','delhi','delhit', 'delhite', 'delhites'];
    // var basicTickers = tickers;
    var trie = new oTrie();
    for(var i=0;i<basicTickers.length;i++){
        // console.log(basicTickers[i]);
        trie.put(basicTickers[i]);
        // console.log(JSON.stringify(trie));
    }
    expect(trie.findWords('').length).toBe(8);
    expect(trie.findWords('delhi').length).toBe(4);
  });

  test('words with spaces', () => {
    var basicTickers = [ 'new delhi','delhi darshan', 'delhi', 'newaza'];
    // var basicTickers = tickers;
    var trie = new oTrie();
    for(var i=0;i<basicTickers.length;i++){
        // console.log(basicTickers[i]);
        trie.put(basicTickers[i]);
        // console.log(JSON.stringify(trie));
    }
    expect(trie.findWords('new').length).toBe(2);
  });



  test('words with', () => {
    var basicTickers = [ 'new$delhi','delhi darshan', 'delhi', 'newaza'];
    // var basicTickers = tickers;
    var trie = new oTrie();
    for(var i=0;i<basicTickers.length;i++){
        // console.log(basicTickers[i]);
        trie.put(basicTickers[i]);
        // console.log(JSON.stringify(trie));
    }
    expect(trie.findWords('new').length).toBe(2);
  });
  
  