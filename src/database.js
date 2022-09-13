const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        mongoose.connect('mongodb+srv://AlanGarcia:Reytatumi10@bibliotecaapp.xjaxszv.mongodb.net/?retryWrites=true&w=majority');
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {connectDB};