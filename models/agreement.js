const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agreementScheme = new Schema({
    ad_id: {
        type: String,
        required: true,
    },
    advertiser_id: {
        type: String,
        required: true,
    },
    advertising_distributor_id: {
        type: String,
        required: true,
    },
    date_start: {
        type: Date,
        required: true,
    },
    date_finish: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    keywords: {
        type: [String]
    },
    finsh_price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true,
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

const Agreement = mongoose.model('Agreement', agreementScheme)

module.exports = Agreement;