var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var mushers = require('./mushers.json')

request('http://iditarod.com/race/2014/', function(err, res, html) {
	var $ = cheerio.load(html);
	var count = 0;
	$('[class^="musher"]').each(function(i, element){
		var name = element.children[0].data;
		request(element.attribs.href, function(err, res, photoHtml){
			var $ = cheerio.load(photoHtml);
			$('[itemprop="photo"]').each(function(j, photoElement){
				mushers.forEach(function(musher){
					if(name === musher.name){
						musher.img = photoElement.attribs.src;
					}
				});
				count++;
				if(count === mushers.length) fs.writeFileSync('mushers.json', JSON.stringify(mushers, null, 2))
			});
		});
    });
});