const bodyParser = require('body-parser')
const express = require('express')
const CORS = require("cors")
const fileUpload = require('express-fileupload');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swStats = require('swagger-stats');
const fs = require('fs')
const fse = require('fs-extra')
const path = require("path")

const swaggerDocument = YAML.load('./oas.yaml')

const config  = require('../../config')
const mongoose = require('mongoose')

mongoose.connect(config.service.db.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

if(!fs.existsSync(config.service.modelDir)){
	fse.mkdirs(config.service.modelDir)
}

if(!fs.existsSync(config.service.tempDir)){
    fse.mkdirs(config.service.tempDir)
}

if(!fs.existsSync(config.service.workDir)){
    fse.mkdirs(config.service.workDir)
}


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
	require("./service"),
	require("./exists_model")
]
.concat(require("./model"))


swaggerDocument.servers[0].url = process.env.HOST || config.service.host;
swaggerDocument.servers[0].description = "";


app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument, uriPath:"/metrics", name:"@molfar/jace-ita"}))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req,res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
	res.end(JSON.stringify({service: "JACE-ITA"}))
})

routes.forEach( route => {
	app[route.method](route.path, route.handler)
})


app.use(express.static(config.service.modelDir))

/*
app.listen(config.service.port, () => {
  console.log(`!!!JACE-ITA SERVICE for starts on port ${config.service.port} in ${config.service.mode} mode.`);
});

*/
module.exports = app;