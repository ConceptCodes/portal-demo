const Proctor = require("../database/models/proctor");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

// login proctor
exports.login = (req, res) => {
  Proctor.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Email or Password is incorrect" });
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ access_token: null, message: "Email or Password is incorrect" });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({ user, access_token: token });
    })
    .catch(err => { res.status(500).send({ message: err.message || "Email or Password is incorrect" }); });
}

// load all proctors
exports.findAll = (req, res) => {
  Proctor.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proctors."
      });
    });
}

// register a new proctor
exports.register = (req, res) => {
  Proctor.create({
    name: req.body.name,
    email: req.body.email,
    proctor_id: req.body.proctor_id,
    password: bcrypt.hashSync(`Password-${req.body.proctor_id}`)
  }).then(() => { res.status(200).send({ message: 'Success' }) })
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occurred while registering Proctor."
    });
  });
}

// Find a single Proctor with an id
exports.findOne = (req, res) => {
  let id = req.sanitize(req.params.id);

  Proctor.findOne({ where: { proctor_id: id } })
    .then(data => { res.send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving Proctor with id=" + id });
    });
};

