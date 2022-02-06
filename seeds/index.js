const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6130d55a1509c722ccfe43a0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Bender, quit destroying the universe! Why not indeed! Oh yeah, good luck with that. WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT! You can see how I lived before I met you.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                    url: "https://res.cloudinary.com/dbnofaryq/image/upload/v1631539157/YelpCamp/dbm7ubncw2xw1tdfndpw.jpg",
                    filename: "YelpCamp/dbm7ubncw2xw1tdfndpw"
                },
                {
                    url: "https://res.cloudinary.com/dbnofaryq/image/upload/v1631539157/YelpCamp/uzwykerb88m7wmp4uqrq.jpg",
                    filename: "YelpCamp/uzwykerb88m7wmp4uqrq"
                }
            ]
        });
        await camp.save();
    };
};

seedDB().then(() => {
    console.log()
    mongoose.connection.close();
});