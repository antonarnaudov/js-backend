const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    tripsHistory: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
})

module.exports = model('User', schema)