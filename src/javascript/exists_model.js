let  { existsSync } = require('fs')
const config = require('../../config');


/**
 * @param {Object} req Запит до серверу
 * @param {String} req.params.name Назва моделі
 * @param {Object} res Відповідь від серверу
 * @return {Promise}
 */

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