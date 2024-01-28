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

    },
    type_of_internet_ad: {
        type: String,

    },
    video_ad: {
        type: Boolean,

    },
    image_ad: {
        type: Boolean,

    },
    resolution: {
        type: String,

    },
    video_duration: {
        type: String, 
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
