const Housing = require('../schemes/Housing')

function validateHousing(housingData ) {
    if (!housingData.notice || !housingData.type || !housingData.year || !housingData.city ||
        !housingData.homeImageUrl || !housingData.propertyDescription || !housingData.availablePieces) {
        throw {message: 'All fields are required'}
    }

// •TODO:	The Home Image should starts with http:// or https://.

    if (housingData.notice.length < 6) {
        throw {message: 'Notice should be at least 6 characters long'}
    }
    if (Number(housingData.year) < 1850 || Number(housingData.year) > 2021) {
        throw {message: 'Year should be between 1850 and 2021'}
    }
    if (housingData.city.length < 4) {
        throw {message: 'City should be at least 4 characters long'}
    }
    if (!["Apartment", "Villa", "House"].includes(housingData.type)) {
        throw {message: 'Type should be one of -> "Apartment", "Villa", "House"'}
    }
    if (housingData.propertyDescription.length > 60) {
        throw {message: 'Property description Max Length EXCEEDED'}
    }
    if (Number(housingData.availablePieces) < 0 || Number(housingData.availablePieces) > 10) {
        throw {message: 'Available Pieces should be between 0 and 10'}
    }
}

async function createHousing(housingData) {

    validateHousing(housingData)

    const housing = new Housing(housingData);
    await housing.save();

    return housing;
}

async function editHousing(id, housingData) {
    const existing = await Housing.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    validateHousing(housingData)

    Object.assign(existing, housingData);
    return existing.save();
}

async function getAllHousings(search={}) {
    return Housing.find(search).lean();
}

async function getHousingById(id) {
    return Housing.findById(id).lean();
}

function deleteHousingById(id) {
    return Housing.findByIdAndDelete(id).lean();
}

module.exports = {
    createHousing,
    editHousing,
    getAllHousings,
    getHousingById,
    deleteHousingById
};