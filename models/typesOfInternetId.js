const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typesOfInternetId = new Schema({
    name:{
        type: String,
        required: true
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

const TypesOfInternetId = mongoose.model('TypesOfInternetId', typesOfInternetId)

module.exports = TypesOfInternetId;