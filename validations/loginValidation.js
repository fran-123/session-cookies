const  {body} = require("express-validator");

const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname,"..","data","users.json"),"utf-8"));

module.exports = [

    body("email")
    .custom((value,{req})=>{
        let user = users.find(user => user.email === value && req.body.name === user.name)

        if(user){
            return true
        }else{
            return false
        }
    }).withMessage("datos invalidos")
]