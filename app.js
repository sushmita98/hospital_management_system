const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Doctor = require("./models/doctor"),
    Patient = require("./models/patient"),
    Medicine = require("./models/medicine"),
    Test = require("./models/test"),
    OPDRecord = require("./models/opd_record"),
    IPDRecord = require("./models/ipd_record"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session"),
    User = require("./models/user"),
    SeedDB = require("./seed");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//EXPRESS_SESSION
app.use(expressSession({ secret: "Hello World!", resave: false, saveUninitialized: false }));

//PASSPORT 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//CUSTOM MIDDLEWARE FOR LOGIN CHECK
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(methodOverride("_method"));

//SEED
//SeedDB();

//MONGOOSE
mongoose.connect('mongodb+srv://admin-anshu:rechargeit@cluster-software-m3p11.mongodb.net/hospital_management', { useNewUrlParser: true, useUnifiedTopology: true });

//ROUTES
app.get('/', isLogged, function (req, res) {
    res.render("reception");
});

//====
//AUTH
//====

//REGISTER GET
app.get('/register', function (req, res) {
    res.render("auth/register");
});

//REGISTER POST
app.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect("/");
        });
    });
});

//LOGIN GET
app.get('/login', function (req, res) {
    res.render("auth/login");
});

//LOGOUT POST
app.post('/login', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}), function (req, res) { });

//LOGOUT GET
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/login');
});

//UNAUTHORIZED
app.get('/unauthorized', function (req, res) {
    res.render("auth/unauthorized");
})

//Middleware functions
function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username == "admin")
            return next();
        else {
            res.redirect('/unauthorized');
        }
    }
    else {
        res.redirect('/login');
    }
}

function isNursing(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username == "nursing")
            return next();
        else {
            res.redirect('/unauthorized');
        }
    }
    else {
        res.redirect('/login');
    }
}

function isLogged(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function isReception(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username == "reception")
            return next();
        res.redirect('/unauthorized');
    }
    else {
        res.redirect('/login');
    }
}

function isReceptionOrAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.username == "reception" || req.user.username == "admin")
            return next();
        else {
            res.redirect('/unauthorized');
        }
    }
    else
        res.redirect('/login');
}

//========
//PATIENTS
//========

//INDEX
app.get("/patients", isLogged, function (req, res) {
    Patient.find({}, function (err, patients) {
        if (err)
            console.log(err);
        else
            res.render("patients/index", { patients: patients });
    });
});

//NEW
app.get("/patients/new", isReceptionOrAdmin, function (req, res) {
    res.render("patients/new");
});

//CREATE
app.post("/patients", isLogged, function (req, res) {
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
app.get("/patients/:id", isLogged, function (req, res) {
    Patient.findById(req.params.id).populate('opd_records').populate('ipd_records').exec(function (err, patient) {
        if (err)
            console.log(err);
        else
            res.render("patients/show", { patient: patient });
    })
});

//SEARCH
app.post("/patients/search", isLogged, function (req, res) {

    var index = req.body.search_name.indexOf(" ");
    var f = req.body.search_name.substr(0, index);
    var l = req.body.search_name.substr(index + 1);

    if (index > 0) {
        Patient.find({ fName: f, lName: l }, function (err, patients) {
            if (err)
                console.log(err);
            else
                res.render("patients/index", { patients: patients });
        });
    }
    else {
        Patient.find({ fName: req.body.search_name }, function (err, patients) {
            if (err)
                console.log(err);
            else
                res.render("patients/index", { patients: patients });
        });
    }
});

//DOCTOR LIST (APPOINTMENTS)
app.get("/patients/:id/appointments/", isReception, function (req, res) {
    Doctor.find({}, function (err, doctors) {
        if (err)
            console.log(err);
        else
            Patient.findById(req.params.id, function (err, patient) {
                if (err)
                    console.log(err);
                else
                    res.render("doctors/index", { doctors: doctors, patient: patient });
            })
    });
})

//NEW APPOINTMENT
app.get("/patients/:id/appointments/:id2/new", isReception, function (req, res) {
    Doctor.findById(req.params.id2, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            Patient.findById(req.params.id, function (err, patient) {
                if (err)
                    console.log(err);
                else
                    res.render("doctors/appointment", { doctor: doctor, patient: patient });
            })
        }
    })
})

//CREATE APPOINTMENT
app.post("/patients/:id/appointments/:id2", isReception, function (req, res) {
    Doctor.findById(req.params.id2, function (err, doctor) {
        if (err)
            console.log(err);
        else
            Patient.findById(req.params.id, function (err, patient) {
                if (err)
                    console.log(err);
                else {
                    doctor.appointments.push(req.body.appointment);
                    doctor.save();
                    patient.appointments.push({
                        consultant: "Dr. " + doctor.fName + " " + doctor.lName,
                        onDate: req.body.appointment.onDate
                    });
                    patient.save();
                    res.redirect("/patients/" + req.params.id);
                }
            })
    });
})


//OPD-CARD SHOW
app.get("/patients/:id/opd-card", isReceptionOrAdmin, function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else
            res.render("patients/opd-show", { patient: patient });
    })
});

//==========
//OPD RECORD
//==========

//New
app.get("/patients/:id/opd-records/new", isReceptionOrAdmin, function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else {
            Doctor.find({}, function (err, doctors) {
                if (err)
                    console.log(err);
                else {
                    res.render("opd_records/new", { patient: patient, doctors: doctors });
                }
            })
        }

    })
});

//CREATE
app.post("/patients/:id/opd-records", isReceptionOrAdmin, function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else {
            Doctor.findById(req.body.opd_record.consultant, function (err, doctor) {
                if (err)
                    console.log(err);
                else {
                    req.body.opd_record.consultant = "Dr. " + doctor.fName + " " + doctor.lName;

                    OPDRecord.create(req.body.opd_record, function (err, record) {
                        if (err)
                            console.log(err);
                        else {
                            record.bill.amt = doctor.fees;
                            record.save();
                            patient.opd_records.push(record);
                            patient.save();
                            res.redirect('/patients/' + req.params.id);
                        }
                    });
                }
            })
        }
    })
});

//SHOW (BILL FORMAT)
app.get("/patients/:id/opd-records/:id2/bill", isReceptionOrAdmin, function (req, res) {
    OPDRecord.findById(req.params.id2, function (err, record) {
        if (err)
            console.log(err);
        else {
            res.render("opd_records/bill", { record: record });
        }
    })
})

//EDIT (BILL PAID)
app.get("/patients/opd-records/:id2/bill", isReceptionOrAdmin, function (req, res) {
    OPDRecord.findById(req.params.id2, function (err, record) {
        if (err)
            console.log(err);
        else {
            record.bill.paid = true;
            record.save();
            res.render("opd_records/bill", { record: record });
        }
    })
})

//==========
//IPD RECORD
//==========

//NEW
app.get("/patients/:id/ipd-records/new", isNursing, function (req, res) {
    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else {
            Medicine.find({}, function (err, medicines) {
                if (err)
                    console.log(err);
                else {
                    Test.find({}, function (err, tests) {
                        if (err)
                            console.log(err);
                        else {
                            res.render("ipd_records/new", { patient: patient, medicines: medicines, tests: tests });
                        }
                    })
                }
            })
        }
    })
});

//CREATE
app.post("/patients/:id/ipd-records", isNursing, function (req, res) {

    Patient.findById(req.params.id, function (err, patient) {
        if (err)
            console.log(err);
        else {

            IPDRecord.create(req.body.ipd_record, function (err, record) {
                if (err)
                    console.log(err);
                else {
                    var medicines = record.medicines;
                    var tests = record.tests;

                    var medTotal = 0;
                    var testTotal = 0;
                    var roomTotal = 0;

                    medicines.forEach(function (medicine) {
                        Medicine.find({ name: medicine }, function (err, med) {
                            if (err)
                                console.log(err)
                            else {
                                medTotal += med[0].cost;
                            }
                        })
                    })

                    tests.forEach(function (test) {
                        Test.find({ name: test }, function (err, tes) {
                            if (err)
                                console.log(err);
                            else
                                testTotal += tes[0].cost;
                        })
                    })

                    roomTotal = ((record.outDate - record.inDate) / 86400000) * 450;


                    setTimeout(function () {
                        record.bill.medCost = medTotal;
                        record.bill.testCost = testTotal;
                        record.bill.room = roomTotal;
                        record.bill.amt = medTotal + testTotal + roomTotal;
                        record.save();
                        patient.ipd_records.push(record);
                        patient.save();
                        res.redirect('/patients/' + req.params.id);
                    }, 100);
                }
            });
        }
    })
});

//SHOW (BILL FORMAT)
app.get("/patients/:id/ipd-records/:id2/bill", isReceptionOrAdmin, function (req, res) {
    IPDRecord.findById(req.params.id2, function (err, record) {
        if (err)
            console.log(err);
        else {
            res.render("ipd_records/bill", { record: record });
        }
    })
})

//EDIT (BILL PAID)
app.get("/patients/ipd-records/:id2/bill", isReceptionOrAdmin, function (req, res) {
    IPDRecord.findById(req.params.id2, function (err, record) {
        if (err)
            console.log(err);
        else {
            record.bill.paid = true;
            record.save();
            res.render("ipd_records/bill", { record: record });
        }
    })
})

//=======
//DOCTORS
//=======

//INDEX
app.get('/doctors', isAdmin, function (req, res) {
    Doctor.find({}, function (err, doctors) {
        if (err)
            console.log(err);
        else
            res.render("doctors/index", { doctors: doctors });
    });
});

//NEW
app.get('/doctors/new', isAdmin, function (req, res) {
    res.render("doctors/new");
});

//CREATE
app.post("/doctors", isAdmin, function (req, res) {

    var newDoctor = {
        fName: req.body.fName,
        lName: req.body.lName,
        image: req.body.image,
        age: req.body.age,
        sex: req.body.sex,
        specialization: req.body.specialization,
        qualification: req.body.qualification,
        fees: req.body.fees,
        address: req.body.address,
        contact: req.body.contact,
        in: req.body.in,
        out: req.body.out
    }

    Doctor.create(newDoctor, function (err, doctors) {
        if (err)
            console.log(err);
        else {
            console.log("doctor added");
            res.redirect('/doctors');
        }
    });
});

//EDIT
app.get('/doctors/:id/edit', isAdmin, function(req, res){
    Doctor.findById(req.params.id, function(err, doctor){
        if(err)
            console.log(err);
        else
            res.render("doctors/edit", {doctor: doctor});
    })
})

//UPDATE
app.put('/doctors/:id', function(req, res){
    Doctor.findByIdAndUpdate(req.params.id, {
        fName: req.body.fName,
        lName: req.body.lName,
        image: req.body.image,
        age: req.body.age,
        sex: req.body.sex,
        specialization: req.body.specialization,
        qualification: req.body.qualification,
        fees: req.body.fees,
        address: req.body.address,
        contact: req.body.contact,
        in: req.body.in,
        out: req.body.out
    }, function(err, updatedDoctor){
        if(err)
        {
            res.redirect('/doctors');
        }
        else
        {
            res.redirect('/doctors');
        }
    })
})

//DOCTOR SEARCH
app.post("/doctors/search", isLogged, function (req, res) {
    Doctor.find({ specialization: req.body.search_spec }, function (err, doctors) {
        if (err)
            console.log(err);
        else
        if (req.body.patientId) {
            Patient.findById(req.body.patientId, function (err, patient) {
                if (err)
                    console.log(err);
                else {
                    res.render("doctors/index", { doctors: doctors, patient: patient });
                }
            })
        }
        else
            res.render("doctors/index", { doctors: doctors });
    });
});

//LISTEN
app.listen(process.env.PORT || 3000, function () {
    console.log("Server Started!");
});
