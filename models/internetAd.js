const mongoose = require('mongoose')
const Schema = mongoose.Schema

const internetAd = new Schema({
    width:{
        type: Number,
        required: true
    },
    height:{
        type: Number,
        required: true
    },
    max_time: {
        type: String, 
        default: "0-00-00-00", 
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type_of_internet_ad: {
        type: String,
        required: true
    },
    video_ad: {
        type: Boolean,
        required: true,
    },
    image_ad: {
        type: Boolean,
        required: true,
    },
    resolution: {
        type: String,
        required: true,
    },
    video_duration: {
        type: String, 
        default: "00:00:00", 
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    target_audience: {
        type: String,
    },
    position: {
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

const InternetAd = mongoose.model('InternetAd', internetAd)

module.exports = InternetAd;