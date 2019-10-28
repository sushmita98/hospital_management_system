const express = require('express'),
    mongoose = require('mongoose');
bodyParser = require('body-parser');
Doctor = require("./models/doctor");
Patient = require("./models/patient");
SeedDB = require("./seed");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//SEED
SeedDB();

//MONGOOSE
mongoose.connect('mongodb://localhost:27017/hospital_management', { useNewUrlParser: true, useUnifiedTopology: true });

//ROUTES
app.get('/', function (req, res) {
    res.render("reception");
});


//========
//PATIENTS
//========

//INDEX
app.get("/patients", function (req, res) {
    Patient.find({}, function (err, patients) {
        if (err)
            console.log(err);
        else
            res.render("patients/index", { patients: patients });
    });
});

//NEW
app.get("/patients/new", function (req, res) {
    res.render("patients/new");
});

//CREATE
app.post("/patients", function (req, res) {
    var newPatient = {
        fName: req.body.fName,
        lName: req.body.lName,
        image: req.body.image,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        contact: req.body.contact
    };

    Patient.create(newPatient, function (err, patient) {
        if (err)
            console.log(err);
        else {
            console.log("Patient added");
            res.redirect("/patients/" + patient._id + "/opd-card");
        }
    });
});

//SHOW
app.get("/patients/:id", function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else
            res.render("patients/show", { patient: patient });
    })
});

//OPD-CARD SHOW
app.get("/patients/:id/opd-card", function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else
            res.render("patients/opd-show", { patient: patient });
    })
});

//=======
//DOCTORS
//=======

//INDEX
app.get('/doctors', function (req, res) {
    Doctor.find({}, function (err, doctors) {
        if (err)
            console.log(err);
        else
            res.render("doctors/index", { doctors: doctors });
    });
});

//NEW
app.get('/doctors/new', function (req, res) {
    res.render("doctors/new");
});


//LISTEN
app.listen(process.env.PORT || 3000, function () {
    console.log("Server Started!");
});