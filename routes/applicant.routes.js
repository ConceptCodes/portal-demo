module.exports = (app) => {
    const applicant = require("../controller/applicant.controller");
    const router = require("express").Router();
    const { authJwt } = require("../middleware");
  
    // Retrieve all Applicants
    router.get("/", authJwt.verifyToken, applicant.findAll);
  
    // Retrieve a single Applicant with id
    router.get("/:id", authJwt.verifyToken, applicant.findOne);
  
    // Leave review for Applicant with id
    router.put("/:id/review", authJwt.verifyToken, applicant.leaveReview);
  
    // Retrieve comments on applicant
    router.get('/:id/comment', authJwt.verifyToken, applicant.findReview)
  
    // Delete an Applicant with id
    router.delete("/:id", authJwt.verifyToken, applicant.delete);
  
    app.use("/api/applicant", router);
  };
  