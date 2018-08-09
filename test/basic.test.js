var tickers = require('./tickers');
var Trie = require('../src/Trie');
var utils = require('../src/utils');
var oTrie = require('../src/optimizedtrie');

  test('bkv', () => {
    var basicTickers = [
                          {k:'delhi', v:1213, p: 2 }, 
                          {k:'dehradun', v:1212, p: 5 },
                          {k:'kolkata', v:1212, p: 11 },
                          {k:'kalicut', v:1212, p: 10 },
                          {k:'mumbai', v:1111, p: 15 },
                          {k:'mumma', v:2, p: 20 },
                          {k:'del', v: 12, p: 11},
                          {k:'delh', v:123, p: 12}
                      ];
    var trie = new oTrie();
    for(var i=0;i<basicTickers.length;i++){
        console.log(basicTickers[i]);
        trie.put(basicTickers[i].k, { payload: basicTickers[i].v, priority: basicTickers[i].p });
        console.log(JSON.stringify(trie));
    }

    expect(trie.findWords('').length).toBe(basicTickers.length);
    expect(trie.findWords('del').length).toBe(3);

  });


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
  
  