var turf = require('turf');
var fs = require('fs');

var route = JSON.parse(fs.readFileSync('./route.geojson'));
var pts = JSON.parse(fs.readFileSync('./checkpoints.geojson'));
var checktimes = require('./checktimes.json');
var mushers = require('./mushers.json')

// join leg data to mushers
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

// compute js datetimes and rests as seconds and leg times in seconds
mushers.forEach(function(musher){
    if(musher.times){
        for(var i = 0; i < musher.times.length; i++) {
            musher.times[i].timein = stringToDatetime(musher.times[i].timein);
            musher.times[i].timeout = stringToDatetime(musher.times[i].timeout);
            musher.times[i].rest = restToSeconds(musher.times[i].rest);
        }
    }
});

// compute leg times in seconds
mushers.forEach(function(musher){
    if(musher.times){
        for(var i = 0; i < musher.times.length - 1; i++) {
            musher.times[i].legtime = (musher.times[i+1].timein - musher.times[i].timeout)/1000;
        }
    }
});

// filter out racers with no times
mushers = mushers.filter(function(musher){
    return musher.times;
});

fs.writeFileSync('./final/mushers.json', JSON.stringify(mushers));

function stringToDatetime(time) {
    if(time) {
        var year = 2014;
        var month = time.split(' ')[0].split('/')[0];
        var day = time.split(' ')[0].split('/')[1];
        var hours = time.split(' ')[1].split(':')[0];
        var minutes = time.split(' ')[1].split(':')[1];
        var datetime = new Date(2014, month, day, hours, minutes, 0, 0);
        return datetime
    } else {
        return '';
    }
}

function restToSeconds(rest) {
    if(rest) {
        var hours = rest.split(' ')[0].split('h')[0];
        var minutes = rest.split(' ')[1].split('m')[0];
        return (hours * 60 * 60) + (minutes * 60)
    } else {
        return '';
    }
}