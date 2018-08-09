
var oTrie = require('../src/optimizedtrie');


 test('priority-basic', () => {
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
        // console.log(basicTickers[i]);
        trie.put(basicTickers[i].k, { payload: basicTickers[i].v, priority: basicTickers[i].p });
    }
    // console.log(JSON.stringify(trie));
    const words = trie.findWords('d', 3);
    console.log("FOUND WORDS", words);
    expect(words.length).toBe(3);

  });