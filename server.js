const bodyParser = require('body-parser')
const express = require('express')
const CORS = require("cors")

const config  = require('./config')

const app = express();
app.use(CORS({
    origin: '*'
}))

// app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes = [
	// require("./src/javascript/train"),
	// require("./src/javascript/predict"),
	// require("./src/javascript/eval"),
	require("./src/javascript/service")
]

app.get("/", (req,res) => {
	res.send({service: "JACE-ITA"})
})

routes.forEach( route => {
	app[route.method](route.path, route.handler)
})

app.listen(config.service.port, () => {
  console.log(`JACE-ITA SERVICE for starts on port ${config.service.port} in ${config.service.mode} mode.`);
});
