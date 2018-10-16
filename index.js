//npm install express --save   es el servidor
//npm install -s bodyparser  funciona para las peticiones post get put delete
//npm install -devDependencies nodemon    es para que cada cambio que se realiza en el codigo se actualice en tiempo real
// para la instalacion de mongodb ir a la pagina oficial click en donwload y la opcion de comunity server
//-- registrar la ruta de la bin de mongodb en el path de window 10 
//-- crear un carpeta en la raiz donde se encuentra el proyecto ejem: c:\data\db  si no se crea esta carpeta saldra un error 
// npm install --save mongoose   esta es la libreria para conectarse a la BD de mongo
//npm install --save bcrypt-nodejs es para encriptar las contraseñas
//npm install --save crypto  tambien se instala
// delete put post get video 10 continuar con el 11

//probar las rutas
//https://www.youtube.com/watch?v=1J8vo9KD0XY&list=PLUdlARNXMVkk7E88zOrphPyGdS50Tadlr&index=17

'use strict'
 

const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')



mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
    if(err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida en mongodb...');

    app.listen(config.port, ()=>{
        console.log(`api rest corriendo en http://localhost:${config.port}`); 
    });
})

