const {check} = require("express-validator")

module.exports =[
    check("name")
    .notEmpty().withMessage("debe ingresar un nombre"),

    check("email")
    .isEmail().withMessage("debe ingresar un email valido"),

    check("colors")
    .notEmpty().withMessage("debe ingresar un color"),

    check("edad")
    .isNumeric().withMessage("debe ingrsar un numero")
]