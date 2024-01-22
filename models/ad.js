const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adScheme = new Schema({
    price:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    internet_ad_id:{
        type: String,
    },
    outdoor_ad_id:{
        type: Number,
    },
    examples_img:{
        type: String,
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

const Ad = mongoose.model('Ad', adScheme)

module.exports = Ad;