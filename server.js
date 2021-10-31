const bodyParser = require('body-parser')
const express = require('express')
const CORS = require("cors")
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

const fs = require('fs')
const fse = require('fs-extra')
const path = require("path")

const config  = require('./config')

if(!fs.existsSync(config.service.modelDir)){
	fse.mkdirs(config.service.modelDir)
}

if(!fs.existsSync(config.service.tempDir)){
    fse.mkdirs(config.service.tempDir)
}

if(!fs.existsSync(config.service.workDir)){
    fse.mkdirs(config.service.workDir)
}

mongoose.connect(config.service.db.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const app = express();
app.use(CORS({
    origin: '*'
}))

app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: config.service.modelDir,
        limits: {
            fileSize: 1024 * 1024 * 1024
        }
    }));

app.use(bodyParser.text());

app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    }));

    app.use(bodyParser.json({
        limit: '50mb'
    }));


routes = [
	require("./src/javascript/service"),
	require("./src/javascript/exists_model")
]
.concat(require("./src/javascript/model"))

app.get("/", (req,res) => {
	res.send({service: "JACE-ITA"})
})

routes.forEach( route => {
	app[route.method](route.path, route.handler)
})


app.use(express.static(config.service.modelDir))

app.listen(config.service.port, () => {
  console.log(`JACE-ITA SERVICE for starts on port ${config.service.port} in ${config.service.mode} mode.`);
});
