//npm install express --save   es el servidor
//npm install -s bodyparser  funciona para las peticiones post get put delete
//npm install -devDependencies nodemon    es para que cada cambio que se realiza en el codigo se actualice en tiempo real
// para la instalacion de mongodb ir a la pagina oficial click en donwload y la opcion de comunity server
//-- registrar la ruta de la bin de mongodb en el path de window 10 
//-- crear un carpeta en la raiz donde se encuentra el proyecto ejem: c:\data\db  si no se crea esta carpeta saldra un error 
// npm install --save mongoose   esta es la libreria para conectarse a la BD de mongo
// delete put post get video 10 continuar con el 11
'use strict'
 
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app= express();
const port = process.env.PORT || 3001;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/api/product/', (req, res)=>{
    Product.find({},(err, products)=>{
        if(err) return res.status(500).send({message : `Error al realizar la peticion: ${err}`})
        if(!products)  return res.status(404).send({message:`No existen productos` })
        res.send(200,{products});
    }) 
})

app.get('/api/product/:productId', (req, res)=>{
    //5bbc37cd3fe2b20860030638
    let productId = req.params.productId;
    Product.findById(productId, (err, product)=>{
        if(err) return res.status(500).send({message:'error al realizar la peticion:'})
        if(!product) return res.status(404).send({message:'producto no existe'})
            res.status(200).send({product});
    })
})
 
app.post('/api/product', (req, res)=>{
    /*console.log(req.body);
    res.status(200).send({message: 'El producto se ha recibidos'});*/
    console.log('POST /api/product')
    console.log(req.body);
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err, productStored) =>{
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
         
        res.status(200).send({product:productStored});
    })

})

app.put('/api/product/:productId', (req, res)=>{
    let productId = req.params.productId
    let update = req.body
    
    Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
        if(!productUpdated) return res.status(404).send({message:'el producto no existe'})
        if(err) res.status(500).send({message : `error al borrar el producto: ${err}`})
        res.status(200).send({product : productUpdated})
    })
})

app.delete('/api/product/:productId', (req, res)=>{
    let productId = req.params.productId

    Product.findById(productId, (err, product)=>{
        if(err) res.status(500).send({message : `error al borrar el producto: ${err}`})
        
        if(!product) return res.status(404).send({message:'el producto no existe'})
        console.log(product);
        product.remove(err =>{
            if(err) res.status(500).send({message : `Error al borrar el producto:`})
            
            res.status(200).send({message : `El producto ha sido eliminado`})
        })
    })
})

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
    if(err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida en mongodb...');

    app.listen(port, ()=>{
        console.log(`api rest corriendo en http://localhost:${port}`); 
    });
})

