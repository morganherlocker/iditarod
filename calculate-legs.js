var turf = require('turf')
var pts = require('./checktimes.json')

for(var i = 0; i < pts.length; i++) {
	console.log(pts[i].name)
}