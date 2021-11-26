const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));

let saveUser = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(dato,null,2),'utf-8') 

const {validationResult} = require("express-validator")

module.exports ={

    register:(req,res)=>{
        return res.render("register")
    },

    registerUpdate:(req,res)=>{
        
        const erorrs = validationResult(req)

        if(erorrs.isEmpty()){
        const{name,email,edad,colors,recordar}=req.body



        req.session.userLogin ={
            name : name.trim(),
            email : email.trim(),
            edad : edad,
            colors : colors
            
        }

        if(recordar){
            res.cookie("userColor",req.session.userLogin,{maxAge: 1 * 365 * 24 * 60 * 60 })
        }
        
        return res.redirect("/user/perfil")
        }else{
            return res.render("register",{
                errors : erorrs.mapped(),
                old : req.body,
            })
        }

        
    },

    check : (req,res)=>{
        return res.render("check")
    },

    perfil : (req,res)=>{
        return res.render("perfil")
    },

    olvidar : (req,res) =>{
        req.session.destroy();
        res.cookie("userColor",null,{maxAge : -1})
        return res.redirect("/")
    }
}