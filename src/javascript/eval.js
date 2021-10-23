const { PythonShell } = require('python-shell')
const _ = require('lodash')
const config = require('../../config')
const v4 = require("uuid").v4

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

queue.on("resolve", data => console.log("task:", data, " resolved"));
queue.on("reject", error => {
	console.log("Restart evaluator...")
	ner = new PythonShell('model_evaluation.py', config.python);
});

let task = (command, resp) => () => new Promise((resolve, reject) => {
    	command = _.extend(command, { _id: v4() })
    
	    ner.once("message", message => {
	        let data = JSON.parse(message)
	        command.result = data
	        resp.json(command)
	        resolve(command)
	    })

	    ner.once("error", err => {
	    	command.error = err
	    	resp.json(command)
	    	reject(err)
	    })

	    ner.send(JSON.stringify(command), { mode: 'json' });
    
})

let ner = new PythonShell('model_evaluation.py', config.python);

module.exports = {
    method: "post",
    path: "/eval",
    handler: async (req, res) => {
    		queue.enqueue(task(req.body, res))	
    }
}