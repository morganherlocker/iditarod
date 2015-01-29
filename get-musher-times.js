var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var pts = JSON.parse(fs.readFileSync('./checkpoints.geojson'));
var checktimes = require('./checktimes.json');
var mushers = require('./mushers.json')

// combine waypoint data
var waypoints = turf.featurecollection([]);
pts.features.forEach(function(pt){
    checktimes.forEach(function(leg){
        if(leg.name === pt.properties.name) {
            mushers.forEach(function(musher){
                leg.times.forEach(function(time){
                    if(musher.name === time.name){
                        var data = {
                            legname: leg.name,
                            timein: time.timein,
                            dogsin: time.dogsin,
                            timeout: time.timeout,
                            dogsout: time.dogsout,
                            rest: time.rest,
                            enroute: time.enroute,
                            speed: time.speed
                        };
                        if(!musher.times) musher.times = [];
                        musher.times.push(data);
                    }
                });
            });
        }
    });
});

fs.writeFileSync('./final/mushers.json', JSON.stringify(mushers));