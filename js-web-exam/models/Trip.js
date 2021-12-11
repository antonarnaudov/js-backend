const { Schema, model } = require('mongoose')

const schema = new Schema({
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    imgUrl: { type: String, required: [true, 'All fields are required'], match: [/^https?/, 'Image must be valid URL'] },
    carBrand: { type: String, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = model('Trip', schema)