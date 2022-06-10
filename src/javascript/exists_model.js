let  { existsSync } = require('fs')
const config = require('../../config');

module.exports = {
    method: "get",
    path: "/exists/model/:name",
    handler: async (req, res) => {
		try {
    		res.send({
    			model:{
    				name: req.params.name,
    				exists: existsSync(`./${config.service.workDir}/${req.params.name}`)
    			}
    		})
		} catch (e) {
			res.status(500).json({
				result:{
					error: e.toString()
				}
			})
		}	
    }
}