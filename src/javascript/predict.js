const {PythonShell} = require('python-shell')
const _ = require('lodash')
const config  = require('../../config')
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
queue.on("reject", error => console.error(error));
 
// queue.enqueue(asyncTaskA); // resolved/rejected after 0ms
// queue.enqueue(asyncTaskB); // resolved/rejected after 2000ms
// queue.enqueue(asyncTaskC); // resolved/rejected after 4000ms  


let task = (command, resp) => () => new Promise(( resolve, reject ) => {
	command = _.extend(command,{_id:v4()})
	ner.once("message", message => {
		let data = JSON.parse(message)
		command.result = data
		resp.json(command)
		resolve(command)
	})
	
	ner.send(JSON.stringify(command), { mode: 'json' });

})


let ner = new PythonShell('model_prediction.py', config.python);


module.exports = {
	method: "post",
	path: "/predict",
	handler: async (req, res) => {
		queue.enqueue(task(req.body, res))
	}
} 
