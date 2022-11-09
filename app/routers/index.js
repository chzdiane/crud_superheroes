const express = require('express');

const router = express.Router()

const _userController = require('../controllers/superheroe/superheroe.controller')


router
    .get("/superheroe", _userController.getSuperheroe)
    .post("/superheroe", _userController.createSuperheroe)
    .put("/superheroe/:id", _userController.updateSuperheroe)
    .delete("/superheroe/:id", _userController.deleteSuperheroe);
    
module.exports = router;

//Registro del MIDDLEWARE
//router.use([_authController.verifyTokenMiddleware]);


//Rutas privadas
/*router
    .get("/verify", _authController.verifyToken)
    .get("/people", _userController.getPeople)
    .post("/people", _userController.createPeople)
    .put("/people/:id", _userController.updatePeople)
    .delete("/people/:id", _userController.deletePeople);

module.exports = router;*/