const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Company model
const Company = require('../../models/Company');


// Validation
const validateCompanyInput = require('../../validation/company');

// @route   GET api/company/test
// @desc    Tests company route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Company Works' }));

// @route   GET api/company
// @desc    Get companies
// @access  Public
router.get('/', (req, res) => {
    Company.find()
        .sort({ name: -1 })
        .then(company => res.json(company))
        .catch(err => res.status(404).json({ nocompanyfound: 'No Companies found' }));
});

// @route   POST api/company
// @desc    Create company
// @access  public
router.post(
    '/',
    (req, res) => {
        const { errors, isValid } = validateCompanyInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        const newCompany = new Company({
            name: req.body.name,
            status: req.body.status,
        });

        newCompany.save().then(company => res.json(company));
    }
);

// @route   GET api/company/:id
// @desc    Get Company by id
// @access  Public
router.get('/:id', (req, res) => {
    Company.findById(req.params.id)
        .then(Company => res.json(Company))
        .catch(err =>
            res.status(404).json({ nocompanyfound: 'No Company found with that id' })
        );
});


// @route   PUT api/Company/:id
// @desc    PUT update Company by id
// @access  Public
router.put('/:id', function (req, res) {
    Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(company => res.json(company))
        .catch(err =>
            res.status(404).json({ error: 'there is a probleming updating' })
        );

});

// @route   DELETE api/Companys/:id
// @desc    Delete Company
// @access  public
router.delete(
    '/:id',
    (req, res) => {
        Company.findById(req.params.id)
            .then(Company => {
                Company.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ Companynotfound: 'No Company found' }));
    }
);

module.exports = router;
