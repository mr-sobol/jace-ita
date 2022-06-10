const fs = require('fs')
const fse = require('fs-extra')

const path = require("path")
const mime = require("mime")
const config = require("../../config")
const zip = require("./util/zip")
const unzip = require("./util/unzip")
const YAML = require("js-yaml")
let Model = require("./models/model")



const prepareZip = async params => {

	const modelFileName = `${params.client}_${params.model.name}_${params.model.locale}.zip`
	const modelDir = path.resolve(`${params.client}_${params.model.name}_${params.model.locale}`)
	const modelZipPath = path.resolve(path.join(config.service.modelDir, modelFileName))

	const metadataPath = path.resolve(path.join(modelDir, ".ita"))

	if(!fs.existsSync(modelDir)){
		throw new Error(`Model ${params.model.name} not found`)
	}	

	fs.writeFileSync(metadataPath, YAML.dump(params))
	await zip( modelDir, modelZipPath)
	
	return modelZipPath
}

const unzipModel = async params => {

	const modelFileName = `${params.client}_${params.model.name}_${params.model.locale}.zip`
	const modelDir = path.resolve(`${params.client}_${params.model.name}_${params.model.locale}`)
	const modelZipPath = path.resolve(path.join(config.service.modelDir, modelFileName))

	let storedObject = await Model.findOne({ "name":modelFileName, client:params.client})
    
    if( storedObject ){
    	
    	fs.writeFileSync(modelZipPath, storedObject.data )
    	
    	if(!fs.existsSync(modelDir)){
				fse.mkdirs(modelDir)
		}
		
		await unzip(modelZipPath, modelDir)

		return true
    } else {
    	return false
    }  
}



const saveModel = async params => {
	try {
		const modelFileName = `${params.client}_${params.model.name}_${params.model.locale}.zip`
	
		let modelZipPath = await prepareZip(params)
		
		let data = fs.readFileSync(modelZipPath)

		let storedObject = await Model.findOne({ "name":modelFileName, client:params.client})
	    let result
	    if( storedObject ){
	      result = await Model.update(
	      	{ "name":modelFileName, "client":params.client},
	      	{ "name":modelFileName, "data":data, "client":params.client}
	      )
	    } else {
	      result = await Model.create({"name":modelFileName, "data":data, "client":params.client})
	    }
	    result.downloadUrl = `/${modelFileName}`
	    return result	
	} catch (e) {
		throw e
	}
	
}

module.exports = [

	// {
	//     method: "get",
	//     path: "/export/model/:name",
	//     handler: async (req, res) => {
	//     		const modelDir = path.resolve(req.params.name)
	//     		const modelZipPath = path.resolve(path.join(config.service.modelDir, `${req.params.name}.zip`))

	// 			if(!fs.existsSync(modelDir)){
	// 				res.sendStatus(404)
	// 				return 
	// 			}	

	// 			await zip( modelDir, modelZipPath)

	// 			data = fs.readFileSync(modelZipPath)

	// 			res.setHeader('Content-type', mime.getType(path.basename(modelZipPath)));
	//       		res.send(data)
	//     }
	// },
	{
		    method: "post",
		    path: "/model/save",
		    handler: async (req, res) => {
		    		try {
		    			let result = await saveModel(req.body)
		    			res.json({
		    				result:{
		    					url: result.downloadUrl	
		    				}
		    			})
		    		} catch (e) {
		    			res.json({
		    				result:{
		    					error: e.toString()
		    				}
		    			})
		    		}
		    }		
	},
	{
		    method: "post",
		    path: "/model/restore",
		    handler: async (req, res) => {
		    		try {
		    			
		    			const modelDir = path.resolve(`${req.body.client}_${req.body.model.name}_${req.body.model.locale}`)
						
						if(fs.existsSync(modelDir)){
							res.json({
			    				result:{
			    					status: "OK"	
			    				}
			    			})
			    			return
						}	

		    			if( await unzipModel(req.body)){
		    				res.json({
			    				result:{
			    					status: "OK"	
			    				}
			    			})	
		    			} else {
		    				res.json({
			    				result:{
			    					warning: `Model "${req.body.model.name}_${req.body.model.locale}" is new model. You must train it first.`
			    				}
			    			})	
		    			}
		    		} catch (e) {
		    			res.json({
		    				result:{
		    					error: e.toString()
		    				}
		    			})
		    		}
		    }		
	},

 //    {
	//     method: "post",
	//     path: "/import/model",
	//     handler: async (req, res) => {
	// 		if (req.files && req.files.file) {

	// 	    	const modelZipPath = path.resolve(path.join(config.service.modelDir, req.files.file.name))
	// 	    	const modelDir = path.resolve(path.basename(modelZipPath,".zip"))
	    		
	// 	    	fs.renameSync(path.resolve(req.files.file.tempFilePath), modelZipPath)
	// 	    	if(!fs.existsSync(modelDir)){
	// 				fse.mkdirs(modelDir)
	// 			}
	// 			await unzip(modelZipPath, modelDir)
	// 	    } 
	// 	    res.sendStatus(200)    
	//     }
	// },

]	