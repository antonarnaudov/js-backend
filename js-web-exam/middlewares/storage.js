const trip = require('../services/trip');

module.exports = () => (req, res, next) => {

    req.storage = {
        ...trip
    };
    next();

};