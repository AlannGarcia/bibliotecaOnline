const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const {connectDB} = require('./database');


const Libro = require('./models/libro.js');


//initialize
connectDB()
const app = express();


//settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleweres
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


//Static files
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.get('/', (req,res,next) =>{
    res.render('index');
})

app.post('/', async(req,res,next) =>{
    const {titulo, autor, descripcion} = req.body;
    const errors = [];
    if(!titulo){
        errors.push({text: 'El título es obligatorio'});
    }
    const repeatTitle = await Libro.findOne({title:titulo});
    if(repeatTitle){
        errors.push({text: 'El libro ya esta agregado'});
    }
    if(!autor){
        errors.push({text: 'El autor/a es obligatorio'});
    } 
    if(!descripcion){
        errors.push({text: 'La descripción es obligatoria'});
    } 
    if(errors.length > 0){
        res.render('index',{
            errors,
            titulo,
            descripcion
        });
    }
    else{
        const newlibro = new Libro();
        newlibro.title = req.body.titulo;
        newlibro.autor = req.body.autor;
        newlibro.description = req.body.descripcion;
        await newlibro.save();
        res.redirect('/listaLibros');
    }
})

app.get('/listaLibros', async(req,res,next) =>{
    const libros = await Libro.find()
    console.log(libros);
    res.render('listaLibros', {libros})
})



//start server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`);
})