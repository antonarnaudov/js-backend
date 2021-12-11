/**
 * Housing
 •    Notice - string (required),
 •    Type - string (“Apartment”, “Villa”, “House”) required,
 •    Year - number (required),
 •    City - string(required),
 •    Home Image - string (required),
 •    Property Description - string (required),
 •    Available pieces - number(required)
 •    Rented a home - a collection of Users(reference to the User model)
 •    Owner- object Id (reference to the User model)
 Note:  When a user rents a home, a reference is added to that collection (Rented a home)
 Implement the entities with the correct data types.

 */

const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    notice: {
        type: String,
        required: true,
    },
    type: {
        "type": String,
        "enum": ["Apartment", "Villa", "House"],
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    homeImageUrl: {
        type: String,
        required: true,
    },
    propertyDescription: {
        type: String,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,
    },
    rentedAHome: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model("Housing", housingSchema);