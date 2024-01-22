const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typesOfOutdoorId = new Schema({
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

const TypesOfOutdoorId = mongoose.model('TypesOfOutdoorId', typesOfOutdoorId)

module.exports = TypesOfOutdoorId;