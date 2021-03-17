const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Customer model
const Customer = require('../../models/Customer');


// Validation
const validateCustomerInput = require('../../validation/customer');

// @route   GET api/customer/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Customer Works' }));

// @route   GET api/customer
// @desc    Get customer
// @access  Public
router.get('/', (req, res) => {
    Customer.find()
        .sort({ name: -1 })
        .then(customer => res.json(customer))
        .catch(err => res.status(404).json({ nocustomerfound: 'No customer found' }));
});

// @route   POST api/customer
// @desc    Create customer
// @access  public
router.post(
    '/',
    (req, res) => {
        const { errors, isValid } = validateCustomerInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        const newCustomer = new Customer({
            name: req.body.name,
            city: req.body.city,
            product: req.body.product_id,
        });

        newCustomer.save().then(customer => res.json(customer));
    }
);

// @route   GET api/customer/:id
// @desc    Get customer by id
// @access  Public
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err =>
            res.status(404).json({ nocustomerfound: 'No customer found with that id' })
        );
});


// @route   PUT api/customer/:id
// @desc    PUT update customer by id
// @access  Public
router.put('/:id', function (req, res) {
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(customer => res.json(customer))
        .catch(err =>
            res.status(404).json({ error: 'there is a probleming updating' })
        );

});

// @route   DELETE api/customer/:id
// @desc    Delete customer
// @access  public
router.delete(
    '/:id',
    (req, res) => {
        Customer.findById(req.params.id)
            .then(customer => {
                Customer.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ customernotfound: 'No customer found' }));
    }
);

module.exports = router;
