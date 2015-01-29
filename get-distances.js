var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var legs = JSON.parse(fs.readFileSync('./legs.geojson'));

route.properties.distance = turf.lineDistance(route, 'miles');
fs.writeFileSync('./final/route.geojson', JSON.stringify(route, null, 2));

legs.features.forEach(function(leg) {
	leg.properties.distance = turf.lineDistance(leg, 'miles');
});
fs.writeFileSync('./final/legs.geojson', JSON.stringify(legs, null, 2));