const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/team_collobration').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
})

module.exports = mongoose