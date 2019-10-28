const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
const Patient = require('./models/patient');

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

function SeedDB()
{
    //PATIENT
    Patient.deleteMany({}, function(err){
        if(err)
            console.log(err);
        else
        {
            data_patient.forEach(function(seed){
                Patient.create(seed, function(err, patient){
                    if(err)
                        console.log(err);
                    else
                        console.log("Patient added!");
                })
            })
        }
    })

    //DOCTOR
    Doctor.deleteMany({}, function(err){
        if(err)
            console.log(err);
        else
        {
            data_doctor.forEach(function(seed){
                Doctor.create(seed, function(err, doctor){
                    if(err)
                        console.log(err);
                    else
                        console.log("Doctor added!");
                })
            })
        }
    })
}

module.exports = SeedDB;