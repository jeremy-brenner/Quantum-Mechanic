var fs = require('fs');

var w = process.argv[2];
var h = process.argv[3];

console.log(`Generating map ${w} x ${h}`);

var data = {
  title: "",
  width: w,
  height: h,
  tiles: []
}

for(var i=0;i<w;i++){
  for(var j=0;j<h;j++) {
    data.tiles.push({x:i,y:j});
  }
}

var json = JSON.stringify(data, null, '\t');
fs.writeFile('src/assets/maps/map.json', json, 'utf8', function(){
  console.log('done');
});
