module.exports = function topN (N){
    var max = N;
    var results = [];

    // checks if the number is in the results
    this.isInN = function(n, start){
        console.log('isInN called with ' + n + ' and start ' + start);
        start = start || 0;
        return results.slice(start).indexOf(n) !== -1;
        
    };

    // to update we start from after start as start is the one which was traversed - and we take the first max 
    this.updateN = function(newN, start) {
        console.log('UpdateN called with ', newN, start);
        if(results.length === 0) {
            results = newN;
        } else {
            // take the 0 to start -1 results and leave them be. 
            //then take the last start to N and merge them with new numbers 
            //except since newN[0] was the one we traversed to get here - don't take that
            results = results.slice(0, start).concat(results.slice(start).concat(newN.slice(1)).sort((a,b) => b-a).slice(0, max - (start)));
        }
        console.log('Results is now', results);
    }

    this.getMax = function() {
        return max;
    }
    // this gives the highest element from a certain point
    this.getTop = function(start) {
        console.log('getTop called with start ' + start);
        start = start || 0;
        if(start >= results.length) {
            return -1;
        } else {
            return results[start] || -1;
        }
    };
}