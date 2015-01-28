var fs = require('fs');

var csv = fs.readFileSync('./data.csv', 'utf8');

var mushers = [];
var rows = csv.split('\n');
rows.forEach(function(row){
    var musher = {};
    var cols = row.split(',');
    musher.place = cols[0];
    musher.name = cols[1];
    musher.days = cols[2].split('d')[0];
    musher.hours = cols[2].split(' ')[1].split('h')[0];
    musher.minutes = cols[2].split(' ')[2].split('m')[0];
    musher.seconds = cols[2].split(' ')[3].split('s')[0];
    musher.home = cols[3];
    musher.winnings = cols[4];

    mushers.push(musher);
});

fs.writeFileSync('./mushers.json', JSON.stringify(mushers, null, 2));

