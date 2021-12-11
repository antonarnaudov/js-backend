const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(value) {
                return value[0] === value[0].toLocaleUpperCase();
            },
            message: 'Name should start with capital letter - {VALUE}',
        },
        required: true
    },
    color: {
        type: String,
        enum: {
            values: ['blue', 'gray', 'orange', 'black', 'white', 'yellow', 'mixed'],
            message: 'Color must be one of blue, gray, orange, black, white, yellow or mixed  ->  {VALUE}'
        },
        required: true
    },
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat;