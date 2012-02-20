
var eyes = require('eyes');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/confoo');

var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var RegistrationSchema = new Schema({
    id    : ObjectId
    , name     : String
    , email      : String
    , profession : String
    , date      : Date
});

mongoose.model('Registration', RegistrationSchema);
var Registration = mongoose.model('Registration');

/*
* GET home page.
*/

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.register = function(req, res){
    var registration = new Registration();
    registration.set({
        name     : req.body.name
        , email      : req.body.email
        , profession : req.body.profession
        , date      : new Date()
    });

    registration.save(function (err) {
        eyes.inspect(err);
        res.redirect('/thankyou');
    });
};


exports.thankyou = function(req, res){
    res.render('thankyou', { title: 'Express' });
};

exports.registrationList = function(req, res){

    Registration.find({}, function(err, docs){

        res.render(
            'registrationList',
            { registrations: docs }

        );

    })
};

exports.export = function(req, res){

    Registration.find({}, function(err, docs){

        res.render(
            'registrationList',
            {
                registrations: docs,
                'layout': false
            }

        );

    })
};