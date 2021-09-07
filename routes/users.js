var express = require('express');
var router = express.Router();

const {register, registerUpdate, perfil, proccesLogin, login, check,olvidar} = require("../controllers/userController")

const regiterCheck = require("../validations/registerCheck")

const loginValidation = require("../validations/loginValidation")

/* GET users listing. */

router.get("/register",register);
router.post("/register",regiterCheck, registerUpdate);
router.get("/login",login)
router.post("/login",loginValidation,proccesLogin)

router.get("/check",check)

router.get("/olvidar",olvidar)

router.get("/perfil",perfil);

module.exports = router;
