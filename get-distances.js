var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var pts = JSON.parse(fs.readFileSync('./legs.geojson'));

route.properties.distance = turf.lineDistance(route, 'miles');
fs.writeFileSync('./route.geojson', JSON.stringify(route, null, 2));

