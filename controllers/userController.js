const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));

let saveUser = (dato) => fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(dato,null,2),'utf-8') 

const {validationResult} = require("express-validator")

module.exports ={

    register:(req,res)=>{
        res.render("register")
    },

    registerUpdate:(req,res)=>{
        const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));
        
        const erorrs = validationResult(req)

        if(erorrs.isEmpty()){
        const{name,email,edad,colors}=req.body

        userRegister={
            id: users[users.length -1] ? users[users.length -1].id +1 : 1,
            name : name.trim(),
            email: email.trim(),
            edad: +edad,
            colors : colors,
        }
        users.push(userRegister)
        saveUser(users)
        
        return res.redirect("/user/login")
        }else{
            return res.render("register",{
                errors : erorrs.mapped(),
                old : req.body,
            })
        }

        
    },
    login : (req,res) =>{
        return res.render("login")
    },

    proccesLogin : (req,res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const{email,recordar}=req.body

            let user = users.find(user => user.email === email)

            req.session.userLogin ={
                id : user.id,
                name : user.name,
                email : user.email,
                edad : user.edad,
                colors : user.colors
                
            }

            req.session.userColor ={
                colors : user.colors
            }
            

            if(recordar){
                res.cookie("userColor",req.session.userColor,{maxAge : 1000 * 60})
            }
           
            
            return res.redirect("/user/perfil")
        }else{
            return res.render("login",{
                errors : errors.mapped(),
            })
        }

    },

    perfil : (req,res)=>{
        return res.render("perfil")
    },

    check : (req,res)=>{
        return res.render("check")
    },

    olvidar : (req,res) =>{
        
        res.cookie("color",null,{maxAge : -1})

        return res.redirect("/user/login")
    }
}