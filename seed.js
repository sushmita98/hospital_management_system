const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');
const OPDRecord = require('./models/opd_record');
const IPDRecord = require('./models/ipd_record');
const Medicine = require('./models/medicine');
const Test = require('./models/test');

//DOCTORS
data_doctor = [{
    fName: 'Bill',
    lName: 'Atkins',
    image: 'https://wonder.dating/images/000/093/420/300x300x34,0,599,565-f16392ce.jpg',
    specialization: 'Cardiologist',
    qualification: 'M.D',
    fees: 750
},
{
    fName: 'Sam',
    lName: 'Simmons',
    image: 'https://devoted.singles/images/000/126/147/300x300x0,0,610,610-691a6a7f.jpg',
    specialization: 'Neurologist',
    qualification: 'M.D',
    fees: 700
},
{
    fName: 'James',
    lName: 'Wood',
    image: 'https://tankactionspa.com/wp-content/uploads/2018/07/doctor-img-05-free-img-300x300.jpg',
    specialization: 'Physician',
    qualification: 'M.B.B.S',
    fees: 500
},
{
    fName: 'Monica',
    lName: 'Adams',
    image: 'https://purepng.com/public/uploads/large/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857330hticw.png',
    specialization: 'Surgeon',
    qualification: 'M.D',
    fees: 650
},
{
    fName: 'John',
    lName: 'Stark',
    image: 'https://www.indianvalleybraces.com/wp-content/uploads/2016/11/Souderton-Orthodontist-silvestre.jpg',
    specialization: 'Neurologist',
    qualification: 'M.D',
    fees: 850
}
];

//PATIENTS
data_patient = [
    {
        fName: "Steve",
        lName: "Johnson",
        image: "http://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
        age: 32,
        sex: "Male",
        address: "730, Riddon Street, New York: 345643",
        contact: 9465874125
    },
    {
        fName: "Boris",
        lName: "Thiel",
        image: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg",
        age: 45,
        sex: "Male",
        address: "34T Boston Main",
        contact: 9465421589
    },
    {
        fName: "Siri",
        lName: "James",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        age: 27,
        sex: "Female",
        address: "100, New South Wales",
        contact: 7854863248
    }
];

//OPD RECORD
data_opd_record = [{
    visitDate: "29/10/2019",
    consultant: "Dr. James Wood",
    complaints: "Cough",
    history: "",
    investigation: "",
    diagnosis: "Common Cold",
    medicines: "P-650, Cold-Aid",
    advice: "Stay away from cold drinks.",
    nextVisit: "29/11/2019"
}]

//TESTS
data_tests = [
    {
        name: "CBC",
        cost: 1200
    },
    {
        name: "Blood Sugar",
        cost: 150
    },
    {
        name: "Lipid Panel",
        cost: 1500
    },
    {
        name: "Liver Panel",
        cost: 1000
    },
    {
        name: "TSH",
        cost: 650
    },
    {
        name: "Haemoglobin",
        cost: 450
    },
    {
        name: "Urinal Analysis",
        cost: 850
    },
    {
        name: "X-Ray (Thorax)",
        cost: 450
    },
    {
        name: "X-Ray (Lower)",
        cost: 450,
    },
    {
        name: "X-Ray (Iso)",
        cost: 500,
    },
    {
        name: "CT Scan",
        cost: 2000
    },
    {
        name: "MRI",
        cost: 2100
    }
]

//MEDICINES
data_meds = [
    {
        name: "Rantac-D",
        cost: 45
    },
    {
        name: "Pantocid-L",
        cost: 95
    },
    {
        name: "Pan-40",
        cost: 80
    },
    {
        name: "Cold-aid",
        cost: 25
    },
    {
        name: "Calpol",
        cost: 60
    },
    {
        name: "SN-15",
        cost: 75
    },
    {
        name: "Zyloric",
        cost: 100
    },
    {
        name: "Thyronorm",
        cost: 120
    },
    {
        name: "Metrogyl",
        cost: 250
    },
    {
        name: "Health Ok",
        cost: 100
    },
    {
        name: "E-Cod",
        cost: 300
    },
    {
        name: "Aziwok",
        cost: 150
    },
    {
        name: "Streptomycin",
        cost: 250
    }
]

//IPD RECORD
data_ipd_record = [{
    inDate: new Date(2019, 8, 9),
    outDate: new Date(2019, 8, 12),
    diet: "Apple, Oats, Whipped cream",
    consultantVisits: [{
        name: "Dr. James Wood",
        visitDate: "10/8/2019"
    }],
    medicines: ['Rantac-D'],
    tests: ['TSH']
}]

function SeedDB() {
    //ADD MEDICINES
    Medicine.deleteMany({}, function (err) {
        if (err)
            console.log(err);
        else {
            data_meds.forEach(function (seed) {
                Medicine.create(seed, function (err, medicine) {
                    if (err)
                        console.log(err);
                });
            })
        }
    });

    //ADD TEST
    Test.deleteMany({}, function (err) {
        if (err)
            console.log(err);
        else {
            data_tests.forEach(function (seed) {
                Test.create(seed, function (err, test) {
                    if (err)
                        console.log(err);
                });
            })

        }
    });

    //ADD PATIENT
    Patient.deleteMany({}, function (err) {
        if (err)
            console.log(err);
        else {

            data_patient.forEach(function (seed) {
                Patient.create(seed, function (err, patient) {
                    if (err)
                        console.log(err);
                    else {
                        //CLEAR OPD RECORDS
                        OPDRecord.deleteMany({});

                        //CLEAR IPD RECORDS
                        IPDRecord.deleteMany({});

                        console.log("Patient added!");

                        //Add OPD Records
                        data_opd_record.forEach(function (or_seed) {
                            OPDRecord.create(or_seed, function (err, opdRecord) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    patient.opd_records.push(opdRecord);
                                }
                            });
                        });

                        //Add IPD Records
                        data_ipd_record.forEach(function (ir_seed) {
                            IPDRecord.create(ir_seed, function (err, ipdRecord) {
                                if (err)
                                    console.log(err);
                                else {
                                    patient.ipd_records.push(ipdRecord);
                                    patient.save();
                                }
                            })
                        })
                    }
                })
            })
        }
    })

    //ADD DOCTOR
    Doctor.deleteMany({}, function (err) {
        if (err)
            console.log(err);
        else {
            data_doctor.forEach(function (seed) {
                Doctor.create(seed, function (err, doctor) {
                    if (err)
                        console.log(err);
                    else
                        console.log("Doctor added!");
                })
            })
        }
    })
}

module.exports = SeedDB;