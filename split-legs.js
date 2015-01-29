var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var pts = JSON.parse(fs.readFileSync('./checkpoints.geojson'));
var checktimes = require('./checktimes.json');
var checkpoints = require('./checkpoints.json');

// combine waypoint data
var waypoints = turf.featurecollection([]);
checkpoints.forEach(function(cp){
    var point;
    pts.features.forEach(function(pt){
        if(pt.properties.name === cp) point = pt;
    })
    if(point) {
        point.properties = {};
        point.properties.name = cp;
        point.properties['marker-color'] = 'f00';
        point.properties['marker-size'] = 'small';
        waypoints.features.push(point);
    }
});

// split segments
var segments = turf.featurecollection([]);
for(var i = 0; i < waypoints.features.length - 1; i++) {
    var leg = turf.lineSlice(waypoints.features[i], waypoints.features[i+1], route);
    leg.properties.start = waypoints.features[i].name;
    leg.properties.stop = waypoints.features[i+1].name;
    segments.features.push(leg);
}

fs.writeFileSync('legs.geojson', JSON.stringify(segments, null, 2))