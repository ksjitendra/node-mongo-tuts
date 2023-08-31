const mongoose = require('mongoose')

const {Schema} = mongoose 

const reviews = new Schema({
    customer_name: { Type: String, required: true },
    review: { type: String, required: true },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true 
    }
}, {
    timestamps: true
})

const reviewModel = mongoose.model('reviews', reviews)

module.exports = reviewModel
