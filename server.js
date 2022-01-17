const express = require('express');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const morgan = require('morgan');
const { xss } = require('express-xss-sanitizer');
const app = express();
const history = require('connect-history-api-fallback');
const path = require('path');
const db = require('./database/models')

const PORT = process.env.PORT || 3000;

const views_dir = path.join(__dirname, '/views')
app.use(express.static(views_dir));

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss());

app.use(history({
  verbose: true
}))

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

require("./routes/applicant.routes")(app);
require("./routes/proctor.routes")(app);

app.use('/', express.static(views_dir));

db.sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => {
    console.log("===================================");
    console.log(`Server is running on port ${PORT}.`);
    console.log("===================================");
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

