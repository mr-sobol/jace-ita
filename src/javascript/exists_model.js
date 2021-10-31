let  { existsSync } = require('fs')


module.exports = {
    method: "get",
    path: "/exists/model/:name",
    handler: async (req, res) => {
    		res.send({
    			model:{
    				name: req.params.name,
    				exists: existsSync(`./${config.service.workDir}/${req.params.name}`)
    			}
    		})	
    }
}