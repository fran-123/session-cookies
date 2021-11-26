var express = require('express');
var router = express.Router();

const {register, registerUpdate, perfil, check,olvidar} = require("../controllers/userController")

const regiterCheck = require("../validations/registerCheck")

const middlewareRegister = require("../middlewares/registerCheck")


/* GET users listing. */

router.get("/register",register);
router.post("/register",regiterCheck, registerUpdate);

router.get("/olvidar",olvidar)

router.get("/perfil",middlewareRegister,perfil);

router.get("/check",middlewareRegister,check)

module.exports = router;
