const express = require('express')
const mongoose = require('mongoose')
const bodyparse = require('body-parser')
const { response } = require('express')
require('dotenv').config()
const app = express()
//Capturar el Body
app.use(bodyparse.urlencoded({   
     extended: false
    })
)
app.use(bodyparse.json())
//Conexion a la base de datos
//const url=`mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.vlohtp2.mongodb.net/${process.env.DBNAME}`
const url = 'mongodb+srv://Cisne:Cisne96R@cluster0.vlohtp2.mongodb.net/Marisol'
//const url=`mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.vlohtp2.mongodb.net/{process.env.DBnpNAME}`

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('conecta a la base de datos!!!'))
.catch((error)=> console.log('Error'+ console.error))
//Creación e importación de Rutas
const authRoutes = require('./routes/auth')
//Ruta del middleware
app.use('/api/user', authRoutes)

//Ruta Raiz
app.get('/', (req, res) => {
    res.json({ 
        estado: true,
        mensaje: ' Si Funciona... vamos a comer!!!'
    })
})
            
            //Arrancar el servidor
        const PORT = process.env.PORT || 9000
        app.listen(PORT, () => {
            console.log(`Escuchando en el puerto: ${PORT}`)
        })