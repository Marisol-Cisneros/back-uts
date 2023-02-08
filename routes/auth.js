const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const {Schema, schema} = require('../models/User')

const SchemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().max(1024).required(),
    password: Joi.string().min(6).required()
})
const SchemaLogin = Joi.object({
    email: Joi.string().max(1024).required(),
    password: Joi.string().min(6).required()
})
router.post('/registar', async(req, res)=>{
    //validación de usuario
    const{error} = SchemaRegister.validate(req.body)
if(error){
  return  res.status(400).json({
       error:error.details[0].message

    })

}
const isEmailUnique = await User.findOne({email:req.body.email})
if(isEmailUnique){
    return  res.status(400).json({
        error:"El correo ya exite"
 
     })
    
}
const salt = await bcrypt.genSalt(10)
const passwordEncriptado = await bcrypt.hash(req.password,salt)

    const USUARIO = new User({
        name: req.body.name,
        lastname:req.body.lastname,
        email: req.body.email,
        pasword:req.body.passwordEncriptado,
    })
    try{
       // const guardado = await USUARIO.save()
        const actualizado = await User.findByIdAndDelete(req.body.id,USUARIO)
        res.json({
        message:'Success Update',
        data:actualizado
        })

    }catch(error){
        res.status(400).json({
            message:'Error alActualizar',
            error
        })
    }
    res.json({
        error:null,
        data:'Aqui vamos a poner los datos '
    })
})


router.post('/login', async(req,res)=> {
    const{error}= SchemaLogin.validate(req.body)
    if(error){
        return res.status(400).json({
            error:error.details[0].message
        })
    }
        const isEmailUnique = await User.findOne({ email: req.body.ema })
        if(!isEmailUnique){
            returnres.status(400).json({
                error:"El correo ya existe"
            })
        }
        const validarPassword = await bcrypt.compare(req.body.password, isEmailUnique.password)
        if(!validarPassword){
            return res.status(400).json({
                error: "password Incorrecto"
            })
        }
        const token = Jwt.sign({
            name:isEmailUnique._name,
            id:isEmailUnique._id
        },process.env.TOKEN_SECRET)
        res.header('auth-token', token).json({
            error:null,
            data:{token }
        })
        })

        router.get('/getallusers',async(req,res)=>{
            const users = await User.find()

            if(users){
                res.json({
                    error:null,
                    data:users
                })
            }else{
                return res.status(400).json({
                    error:"No hay usuarios"
                })
            }
        })

        router.post('/eraseuser',async(req,res)=>{
            const id= req.body.id


            const erased = await User.findByIdAndDelete(id)
            if(erased){
                res.json({
                    error:null,
                    message:"Borrado satisfactoriamente"
                })
            }else{
                return res.status(400).json({
                    error:"No se pudo borrar el usuario"
                })
        
            }
        })
        router.post('/login', async(req,res)=> {
    const{error}= SchemaLogin.validate(req.body)
    if(error){
        return res.status(400).json({
            error:error.details[0].message
        })
        
    }
        const isEmailUnique = await User.findOne({ email: req.body.ema })
        if(!isEmailUnique){
            returnres.status(400).json({
                error:"El correo ya existe"
            })
        }
        const validarPassword = await bcrypt.compare(req.body.password, isEmailUnique.password)
        if(!validarPassword){
            return res.status(400).json({
                error: "password Incorrecto"
            })
        }
        const token = Jwt.sign({
            name:isEmailUnique._name,
            id:isEmailUnique._id
        },process.env.TOKEN_SECRET)
        res.header('auth-token', token).json({
            error:null,
            data:{token }
        })
        })

        router.get('/getallusers',async(req,res)=>{
            const users = await User.find()

            if(users){
                res.json({
                    error:null,
                    data:users
                })
            }else{
                return res.status(400).json({
                    error:"No hay usuarios"
                })
            }
        })

        router.post('/eraseuser',async(req,res)=>{
            const id= req.body.id


            const erased = await User.findByIdAndDelete(id)
            if(erased){
                res.json({
                    error:null,
                    message:"Borrado satisfactoriamente"
                })
            }else{
                return res.status(400).json({
                    error:"No se pudo borrar el usuario"
                })
        
            }
        })
        //////////Modificar///////////
       
        router.post('/updateuser', async(req, res) => {
            // Validación de Usuario
            const { error } = schemaUpdateuser.validate(req.body)
            
            if(error){
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
        
            const isEmailUnique = await User.findOne({ email: req.body.email })
            if(isEmailUnique){
                return res.status(400).json({
                    error: "El correo ya existe"
                })
            }
        
            const salt = await bcrypt.genSalt(10)
            const passswordEncriptado = await bcrypt.hash(req.body.password, salt)
        
        
            const usuario = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: passswordEncriptado 
            }
        
            //res.json({
              //  error: null,
                //data: 'Aquí vamos a poner los datos'
            //})
        
            try{
                const actualizar = await User.findByIdAndUpdate(req.body.id, usuario)
                res.json({
                    message: 'Success',
                    data: actualizar
                })
        
            }catch(error){
                res.status(400).json({
                    message: 'Error al actualizar',
                    error
                })
            }
        }) 
     

module.exports=router