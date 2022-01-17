module.exports = app => {
    const proctor = require("../controller/proctor.controller");
    const router = require("express").Router();
    const { authJwt } = require("../middleware");

    router.post('/login', proctor.login)

    router.post('/register', proctor.register)

    router.get('/', authJwt.verifyToken, proctor.findAll)

    router.get('/:id', authJwt.verifyToken, proctor.findOne)

    app.use("/api/proctor", router);
}