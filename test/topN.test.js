var topN = require('../src/topN');


test('top3', () => {
    var top3 = new topN(3);
   
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(90)).toBe(true);
    expect(top3.isInN(101)).toBe(true);
    expect(top3.isInN(85)).toBe(false);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(90)).toBe(false);
    expect(top3.getTop(1)).toBe(-1);
    expect(top3.getTop()).toBe(101);
    expect(top3.getTop(2)).toBe(100);

  });


  test('top5', () => {
    var top3 = new topN(5);
   
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(100)).toBe(true);
    expect(top3.isInN(90)).toBe(false);
    expect(top3.isInN(101)).toBe(true);
    expect(top3.isInN(120)).toBe(true);
    expect(top3.isInN(85)).toBe(false);
  
  });