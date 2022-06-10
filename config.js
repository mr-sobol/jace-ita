const path = require("path")

module.exports = {

	service:{
		lang: process.env.NER_LANG || "en",
		mode: process.env.NODE_ENV || "development",
		port: process.env.PORT || 3002,
		host: process.env.HOST || "localhost",
		modelDir: path.resolve("./.models"),
		tempDir: path.resolve("./.tmp"),
		workDir: ".work",
		db:{
			mongo:{
				url: process.env.MONGO_URL || "mongodb+srv://jace:jace@ita.w4lkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
			}
		}

	},

	python: {
		mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: './src/python/ita-py',
		pythonPath: (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'python3' : 'python.exe'
	}
}
