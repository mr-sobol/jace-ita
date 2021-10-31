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
    const modelDir = path.resolve(`./${config.service.workDir}/${params.client}_${params.model.name}_${params.model.locale}`)
    const modelZipPath = path.resolve(path.join(config.service.modelDir, modelFileName))

    const metadataPath = path.resolve(path.join(modelDir, ".ita"))

    if (!fs.existsSync(modelDir)) {
        throw new Error(`Model ${params.model.name} not found`)
    }

    fs.writeFileSync(metadataPath, YAML.dump(params))
    await zip(modelDir, modelZipPath)

    return modelZipPath
}

const unzipModel = async params => {

    const modelFileName = `${params.client}_${params.model.name}_${params.model.locale}.zip`
    const modelDir = path.resolve(`./${config.service.workDir}/${params.client}_${params.model.name}_${params.model.locale}`)
    const modelZipPath = path.resolve(path.join(config.service.modelDir, modelFileName))

    let storedObject = await Model.findOne({ "name": modelFileName, client: params.client })

    if (storedObject) {

        fs.writeFileSync(modelZipPath, storedObject.data)

        if (!fs.existsSync(modelDir)) {
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

        let storedObject = await Model.findOne({ "name": modelFileName, client: params.client })
        let result
        if (storedObject) {
            result = await Model.update({ "name": modelFileName, client: params.client }, { "name": modelFileName, "data": data, "client": params.client })
        } else {
            result = await Model.create({ "name": modelFileName, "data": data, "client": params.client })
        }
        result.downloadUrl = `/${modelFileName}`
        return result
    } catch (e) {
        throw e
    }

}

const restoreMetadata = modelDir => {
    let filePath = path.resolve(path.join(modelDir, "./.ita"))
    let data = fs.readFileSync(filePath)
    return YAML.load(data)
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
        path: "/model/list",
        handler: async (req, res) => {
            try {
                let result = await Model.find({ client: req.body.client })
                res.json({
                    result: result.map(r => r.name)
                })
            } catch (e) {
                res.json({
                    result: {
                        error: e.toString()
                    }
                })
            }
        }
    },

    {
        method: "post",
        path: "/model/save",
        handler: async (req, res) => {
            try {
                let result = await saveModel(req.body)
                res.json({
                    result: {
                        url: result.downloadUrl
                    }
                })
            } catch (e) {
                res.json({
                    result: {
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

                const modelDir = path.resolve(`./${config.service.workDir}/${req.body.client}_${req.body.model.name}_${req.body.model.locale}`)

                if (fs.existsSync(modelDir)) {
                    res.json({
                        result: {
                            status: "OK"
                        }
                    })
                    return
                }

                if (await unzipModel(req.body)) {
                    res.json({
                        result: {
                            status: "OK"
                        }
                    })
                } else {
                    res.json({
                        result: {
                            warning: `Model "${req.body.model.name}_${req.body.model.locale}" is new model. You must train it first.`
                        }
                    })
                }
            } catch (e) {
                res.json({
                    result: {
                        error: e.toString()
                    }
                })
            }
        }
    },
    {
        method: "post",
        path: "/model/select/:filename",
        handler: async (req, res) => {
            try {

                let params = path.basename(req.params.filename, ".zip").split("_")
                params = {
                    client: params[0],
                    model: {
                        name: params[1],
                        locale: params[2]
                    }
                }

                const modelDir = path.resolve(`./${config.service.workDir}/${params.client}_${params.model.name}_${params.model.locale}`)

                if (fs.existsSync(modelDir)) {
                    res.json({
                        result: restoreMetadata(modelDir)
                    })
                    return
                }

                if (await unzipModel(params)) {

                    res.json({
                        result: restoreMetadata(modelDir)
                    })

                } else {
                    res.json({
                        result: {
                            warning: `Model "${req.body.model.name}_${req.body.model.locale}" is new model. You must train it first.`
                        }
                    })
                }
            } catch (e) {
                res.json({
                    result: {
                        error: e.toString()
                    }
                })
            }
        }
    },

    {
        method: "post",
        path: "/model/import/:client",
        handler: async (req, res) => {
            try {
            	
                if (req.files && req.files.file) {

                    let modelZipPath = path.resolve(path.join(config.service.modelDir, req.files.file.name))
                     // modelDir = path.resolve(config.service.tempDir)

                    fs.renameSync(path.resolve(req.files.file.tempFilePath), modelZipPath)
                    
                    if (!fs.existsSync(config.service.tempDir)) {
                        fse.mkdirs(config.service.tempDir)
                    }
                    console.log(modelZipPath," -> ", config.service.tempDir)
                    await unzip(modelZipPath, config.service.tempDir)
                    
                    let metadata = restoreMetadata(config.service.tempDir)
                    
                    metadata.client = req.params.client
                    let modelDir = path.resolve(`./${config.service.workDir}/${metadata.client}_${metadata.model.name}_${metadata.model.locale}`)
                    
                    if (!fs.existsSync(modelDir)) {
                        fse.mkdirs(modelDir)
                    }

                    console.log(modelZipPath," -> ", modelDir)
                    await unzip(modelZipPath, modelDir)

                    res.json({
                        result: metadata
                    })
                } else {
                    res.json({
                        result: {
                            error: `Model file not found`
                        }
                    })
                }
            } catch (e) {
                res.json({
                    result: {
                        error: e.toString()
                    }
                })
            }


        }
    }

]