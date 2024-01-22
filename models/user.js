const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    number_of_sales: {
        type: Number,
    },
    number_of_purchased: {
        type: Number,
    },
    role: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
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

userScheme.pre('save', function (next) {
    this.createdBy = this.username;
    this.updatedBy = this.username;
    next();
});

const User = mongoose.model('User', userScheme)

module.exports = User;