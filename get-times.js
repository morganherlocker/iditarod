var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var pts = require('./checkpoints.json');
var mushers = require('./mushers.json');

request('http://iditarod.com/race/2014/checkpoints/', function(err, res, html) {
    var $ = cheerio.load(html);

    var checkpoints = [];
    var as = $('table').find('a');
    as.each(function(i, el){
        var checkpoint = {
                name: $(this).text(),
                link: el.attribs.href
            };
        request(el.attribs.href, function(err, res, html) {
            var $ = cheerio.load(html);
            var times = [];
            $('tbody').find('tr').each(function(k, el) {
                var data = [];
                $(this).find('td').each(function(k, el) {
                    data.push($(this).text());
                });
                var musher = {
                    name: data[0],
                    timein: data[2],
                    dogsin: data[3],
                    timeout: data[4],
                    dogsout: data[5],
                    rest: data[6],
                    enroute: data[7],
                    speed: data[9],
                    scratched: data[12]
                };
                times.push(musher);
            });
            if(!times.length) console.log('NO TIMES: ' + checkpoint.name)
            checkpoint.times = times;
            checkpoints.push(checkpoint);
            if(i === pts.length - 1){
                fs.writeFileSync('./checktimes.json', JSON.stringify(checkpoints, null, 2));
            }
        });
    });
});