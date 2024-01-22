const mongoose = require('mongoose')
const Schema = mongoose.Schema

const outdoorAd = new Schema({
    width:{
        type: Number,
        required: true
    },
    height:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type_of_outdoor_ad: {
        type: String,
        required: true
    },
    GPS_X: {
        type: String,
        required: true
    },
    GPS_Y: {
        type: String,
        required: true
    },
    illumination: {
        type: Boolean,
        required: true
    },
    condition: {
        type: String
    },
    material: {
        type: String
    },
    createdBy: {
        type: String,
        default: "username"
    },
    updateBy: {
        type: String,
        default: "username"
    },
    deletedBy: {
        type: String,
    },
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const OutdoorAd = mongoose.model('OutdoorAd', outdoorAd)

module.exports = OutdoorAd;