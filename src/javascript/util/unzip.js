const path = require("path")

module.exports = (path2zip, path2dest) => new Promise( (resolve, reject) => {
	const inly = require('inly');
	const extract = inly(path2zip, path2dest);
	let _p = 0
	
	extract.on('file', (name) => {
	    console.log(`file ${name} extracted`);
	});

	extract.on('error', (error) => {
	    reject(error)
	});

	extract.on('end', () => {
	    resolve()
	});	
})

