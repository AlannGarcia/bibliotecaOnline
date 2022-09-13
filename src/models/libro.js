const mongoose = require('mongoose');
const {Schema} = mongoose;


const libroSchema = new Schema({
    title: String,
    autor: String,
    description: String
});

module.exports = mongoose.model('libros', libroSchema);

