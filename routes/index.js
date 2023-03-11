const express = require('express');
const mongoose = require('mongoose');
const { route } = require('../app');

const router = express.Router();
const Registration = mongoose.model('Registration');
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res){
    res.render('form', { title: 'Registration form'});
});
router.post('/',
    [
        check('name')
            .isLength({ min:1 })
            .withMessage('Please enter a name'),
        check('email')
            .isLength({ min:1 })
            .withMessage('Please enter an email'),
    ],
    function(req, res){
    //console.log(reg.body);
    const errors = validationResult(req);
    if (errors.isEmpty()){
        const registration = new Registration(req.body);
        registration.save()
        .then(() => {res.send('Thank you for your registration!'); })
        .catch(() => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
        })
    } else {
        res.render('form',{
            title: 'Registration form',
            errors: error.array(),
            data: req.body,
        });
    }
});

module.exports = router;