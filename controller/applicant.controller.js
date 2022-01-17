const Applicant = require("../database/models/applicant");
const Review = require("../database/models/review");

// Retrieve all applicants from the database.
exports.findAll = (req, res) => {
  Applicant.findAll({ include: { model: Review, as: 'reviews' } })
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message:  err.message || "Some error occurred while retrieving applicants." }); });
};

// Find a single Applicant 
exports.findOne = (req, res) => {
  let id = req.params.id;
  Applicant.findByPk(id, {include: {model: Review, as: 'reviews'}})
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({ message: err.message || "Error retrieving Applicant with id=" + id }); });
};

// leave a review for a single applicant
exports.leaveReview = (req, res) => {
  const id = req.params.id;
  Review.create({
    rating: req.body.rating,
    comment: req.body.comment,
    proctor: req.body.proctor,
    strengths: req.body.strengths,
    applicant_id: id,
  })
  .then(() => { 
    Applicant.update({ status: true }, { where: { id: id } })
      .then(num => {
        if (num == 1) {  res.status(200).send({ message: 'Review added successfully!'}) } 
        else {  res.status(400).send({ message: `Cannot update Applicant with id=${id}` }); }
      })
      .catch(err => { res.status(500).send({ error: err, message: "Error updating Applicant with id=" + id });
      });
   })
  .catch((err) => { res.status(500).send({ message: err.message }) });
};

// load all reviews for a single applicant
exports.findReview = (req, res) => {
  let id = req.params.id;
  return Review.findByPk(id, { include: { model: Applicant , as: 'applicant' } })
    .then((review) => { res.status(200).send({ data: review }) })
    .catch((err) => { res.status(500).send({ message: err.message }) });
}

// Delete an Applicant 
exports.delete = (req, res) => {
  const id = req.params.id;

  Applicant.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) { res.send({ message: "Applicant was deleted successfully!" }); }
      else { res.send({ message: `Cannot delete Applicant with id=${id}.` }); }
    })
    .catch(err => { res.status(500).send({ message: err.message || "Could not delete Applicant with id=" + id }); });
};
