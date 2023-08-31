const mongoose = require('mongoose')

const { Schema } = mongoose 

const CabsSchema = new Schema({
    vehicle_name: { type: String, required: true },
    vehicle_type: { type: String },
    vehicle_number: { type : String, required: true },

    // Only object id needs to pass as a type to the field which is maintaning in relations
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

}, {
    timestamps: true
} )


const cabsModel = mongoose.model('cabs',CabsSchema)

module.exports = cabsModel


