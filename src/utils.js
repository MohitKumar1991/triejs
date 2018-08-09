
const bytes = function(s){
  return ~-encodeURI(s).split(/%..|./).length;
}

const jsonSize = function(s){
  return bytes(JSON.stringify(s));
}


module.exports = {
  jsonSize
}
