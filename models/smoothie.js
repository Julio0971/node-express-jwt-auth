const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smoothie_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }
}, { timestamps: true })

const Smoothie = mongoose.model('Smoothie', smoothie_schema)

module.exports = Smoothie