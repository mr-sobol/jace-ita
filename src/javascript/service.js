const { PythonShell } = require('python-shell')
const { extend, keys } = require('lodash')
const config = require('../../config')
const v4 = require("uuid").v4


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




let task = (command, resp) => () => new Promise((resolve, reject) => {
    	command = extend(command, { _id: v4() })
	
		let ner = pys[command.cmd].shell

	    ner.once("message", message => {
	        let data = JSON.parse(message)
	        command.result = data
	        resp.json(command)
	        resolve(command)
	    })

	    ner.once("error", err => {
	    	command.error = err
	    	reject(command)
	    })

	    ner.send(JSON.stringify(command), { mode: 'json' });
    
})


module.exports = {
    method: "post",
    path: "/:command",
    handler: async (req, res) => {
    		let command = extend({}, req.body, { cmd: req.params.command})
    		queue.enqueue(task(command, res))	
    }
}