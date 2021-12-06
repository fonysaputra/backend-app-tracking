const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

process.env.TZ = 'Asia/Jakarta' 
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const db = require("./src/models");
const Role = db.role;
 db.sequelize.sync();



// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);
require('./src/routes/outlet.routes')(app);
require('./src/routes/transaction.routes')(app);
require('./src/routes/images.routes')(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend app telkomsel application." });
});

const dotenv = require('dotenv');
dotenv.config();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});