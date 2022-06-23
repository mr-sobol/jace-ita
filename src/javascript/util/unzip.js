const path = require("path")

/**
 * @param {Object} path2zip Шлях до архіву
 * @param {Object} path2dest Шлях де має розархівуватись архів
 * @return {Promise}
 */

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

