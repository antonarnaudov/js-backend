const mongoose = require('mongoose');
const Cat = require('./models/Cat');
const Person = require('./models/Person');

start()
async function start() {
    const connectionStr = 'mongodb://localhost:27017/testdb';
    const client = await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('>>> Database connected');

    const cat1 = new Cat({
        name: 'fluffy',
        color: 'white'
    })

    const person1 = new Person({
        firstName: 'Test',
        lastName: 'User',
        age: -34
    })

    try {
        await cat1.save()
    } catch (err) {
        console.error('>>>', err.message)
    }

    try {
        await person1.save()
    } catch (err) {
        console.error('>>>', err.message)
    }


    const data = await Person.find({})
    console.log(data);
    data.forEach(p => p.sayHi())
    data.map(p => p.fullName).forEach(n => console.log(n))
}