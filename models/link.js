const {Schema, model, Types} = require('mongoose')

const linkchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
        unic: true
    },
    code: {
        type: String,
        required: true,
        unic: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    click: {
        type: Number,
        default: 0
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Link', linkchema)