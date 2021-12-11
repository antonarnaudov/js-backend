const Trip = require('../models/Trip')

async function createTrip(tripData) {

    const trip = new Trip(tripData);
    await trip.save();

    return trip;
}

async function getAllTrips() {
    const trips = await Trip.find({}).lean();
    return trips;
}

async function getTripById(id) {
    const trip = await Trip.findById(id).lean();
    return trip;
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById
};