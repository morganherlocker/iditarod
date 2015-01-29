var ct = require('./checktimes.json')

ct.forEach(function(pt){
	console.log(pt.name + ' ' +pt.times.length)
})