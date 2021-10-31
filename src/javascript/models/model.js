const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    name: {
        type: 'string',
        required: true
    },
    
    client: {
        type: 'string',
        required: true
    },

    data: {
        type: Buffer,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model('Model', schema, 'model')