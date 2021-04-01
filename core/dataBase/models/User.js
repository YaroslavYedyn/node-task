const { Schema, model } = require('mongoose');

const { magicString: { DATA_BASE_TABLE: { USER } } } = require('../../constants');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        default: ''
    },
    activate_token: {
        type: String,
        select: false
    },
    activate_status: { type: Boolean }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model(USER, userSchema);
