const mongoose = require('mongoose')

const { Schema } = mongoose 

const product = new Schema({
    name: { type: String, required : true  }, 
    price: { type: Double, required: true  },
})
