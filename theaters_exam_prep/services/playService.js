const Play = require('../schemes/Play')

async function createPlay(playData) {
    if (!playData.title || !playData.description || !playData.imageUrl) {
        throw {message: 'All fields are required'}
    }

    if (playData.description.length > 50) {
        throw {message: 'Description max length is 50 characters'}
    }

    let isPlay = await Play.findOne({ title: playData.title });

    if (isPlay) {
        throw { message: "This title already exist" }
    }

    const play = new Play(playData);
    await play.save();

    return play;
}

async function editPlay(id, data) {
    const existing = await Play.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(existing, data);
    return existing.save();
}

async function getAllPlays(sort={}) {
    return Play.find({isPublic: true}).sort(sort).lean();
}

async function getPlayById(id) {
    return Play.findById(id).lean();
}

module.exports = {
    createPlay,
    editPlay,
    getAllPlays,
    getPlayById
};