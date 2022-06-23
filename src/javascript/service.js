const { PythonShell } = require('python-shell')
const { extend, keys } = require('lodash')
const config = require('../../config')
const v4 = require("uuid").v4
let  { existsSync } = require('fs')
const path = require("path")


let pys = {
	train: {
		path: "model_training.py",
		shell: new PythonShell('model_training.py', config.python)
	},
	predict: {
		path: "model_prediction.py",
		shell: new PythonShell('model_prediction.py', config.python)
	},
	eval: {
		path: "model_evaluation.py",
		shell: new PythonShell('model_evaluation.py', config.python)
	}	
}




let Queue = require("queue-promise")
const queue = new Queue({
    concurrent: 1,
    interval: 2
});

queue.on("start", () => {
    console.log(`Queue started at ${new Date()}`)
});
queue.on("stop", () => {
    console.log(`Queue stoped at ${new Date()}`)
});

queue.on("resolve", data => console.log("task:", data.cmd, data._id, " resolved"));

queue.on("reject", command => {
	console.log(`Restart ${pys[command.cmd].path} ...`)
	pys[command.cmd].shell = new PythonShell(pys[command.cmd].path, config.python);
});


/**
 * @param {Object} command
 * @param {String} command.cmd 
 * @param {Object} resp
 * @return {Promise}
 */

let task = (command, resp) => () => new Promise((resolve, reject) => {
    	command = extend(command, { _id: v4() })
	
		let ner = pys[command.cmd].shell

	    ner.once("message", message => {
	        let data = JSON.parse(message)
	        command.result = data
	        console.log(data)
	        resp.json(command)
	        resolve(command)
	    })

	    ner.once("error", err => {
	    	command.error = err
	    	console.log(command.error)
	    	reject(command)
	    })

	    ner.send(JSON.stringify(command), { mode: 'json' });
    
})

/**
 * @param {Object} req
 * @param {String} req.body.model.name  Ім'я моделі 
 * @param {String} req.body.model.locale  Мова моделі 
 * @param {String} req.params.command  Команда, що має виконатись
 * @param {Object} resp
 * @return {Promise}
 */
module.exports = {
    method: "post",
    path: "/:command",
    handler: async (req, res) => {
    	console.log(path.resolve(`./${config.service.workDir}/${req.body.model.name}_${req.body.model.locale}`))
    		if (["predict","eval"].includes(req.params.command) 
    				&& 
    			!existsSync(path.resolve(`./${config.service.workDir}/${req.body.model.name}_${req.body.model.locale}`)) ){
    			res.json(extend({}, req.body, { cmd: req.params.command}, {
    				result:{
    					warning:`The model "${req.body.model.name}_${req.body.model.locale}" is not available. You must train it first or import it first.`
    				}
    			}))
    			return
    		}
    		
    		let command = extend({}, req.body, { cmd: req.params.command, workDir:config.service.workDir})
    		queue.enqueue(task(command, res))	
    }
}