var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var pts = JSON.parse(fs.readFileSync('./checkpoints.geojson'));
var checkpoints = require('./checkpoints.json');

// snap waypoints to route
var waypoints = turf.featurecollection([]);
checkpoints.forEach(function(cp){
    var point;
    pts.features.forEach(function(pt){
        if(pt.properties.name === cp) point = pt;
    })
    if(point) {
        point = turf.pointOnLine(route, point);
        point.properties = {};
        point.properties.name = cp;
        waypoints.features.push(point);
    }
});

fs.writeFileSync('./final/waypoints.geojson', JSON.stringify(waypoints, null, 2));