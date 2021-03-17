const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Product model
const Product = require('../../models/Product');
const Customer = require('../../models/Customer');
const Company = require('../../models/Company');


// Validation
const validateProductInput = require('../../validation/product');

// @route   GET api/product/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Product Works' }));

// @route   GET api/product/search
// @desc    to search products
// @access  Public
router.get('/search', (req, res) => {
    let searchObj = {};
    if (req.query.companyName) {
        searchObj.companyName = req.query.companyName;
    }
    if (req.query.customerName) {
        searchObj.name = req.query.customerName;
    }
    Customer.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: "product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                city: 1,
                productName: "$product.name",
                productPrice: "$product.price",
                productCompany: "$product.company",
                product_id: "$product._id",
            }
        },
        {
            $lookup: {
                from: 'companies',
                localField: "productCompany",
                foreignField: "_id",
                as: "company"
            }
        },
        {
            $unwind: "$company"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                city: 1,
                productName: 1,
                productPrice: 1,
                productCompany: 1,
                product_id: 1,
                company_id: "$company._id",
                companyName: "$company.name",
                companyStatus: "$company.status",
            }
        },
        { $match: searchObj },


    ])
        .then((chartStats) => {

            res.send(chartStats);
        }).catch(err => res.status(404).json({ 'error': err }));

});

// @route   GET api/product/search
// @desc    to search popular products
// @access  Public
router.get('/popular', (req, res) => {
    let searchObj = {};
    if (req.query.name) {
        searchObj.name = req.query.name;
    }
    if (req.query.city) {
        searchObj.city = req.query.city;
    }
    Customer.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: "product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                city: 1,
                productName: "$product.name",
                productPrice: "$product.price",
                productCompany: "$product.company",
                product_id: "$product._id",
            }
        },
        {
            $lookup: {
                from: 'companies',
                localField: "productCompany",
                foreignField: "_id",
                as: "company"
            }
        },
        {
            $unwind: "$company"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                city: 1,
                productName: 1,
                productPrice: 1,
                productCompany: 1,
                product_id: 1,
                company_id: "$company._id",
                companyName: "$company.name",
                companyStatus: "$company.status",
            }
        },
        { $match: searchObj },
        {
            $group: {
                _id: "$name",
                totalPrice: { $sum: "$productPrice" }
            }
        },
        { $sort: { totalPrice: -1 } },


    ])
        .then((chartStats) => {

            res.send(chartStats);
        }).catch(err => res.status(404).json({ 'error': err }));

});

// @route   GET api/product
// @desc    Get products
// @access  Public
router.get('/', (req, res) => {
    Product.find()
        .sort({ name: -1 })
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ noproductfound: 'No product found' }));
});

// @route   POST api/product
// @desc    Create product
// @access  public
router.post(
    '/',
    (req, res) => {
        const { errors, isValid } = validateProductInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            company: req.body.company_id,
        });

        newProduct.save().then(company => res.json(company));
    }
);

// @route   GET api/product/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err =>
            res.status(404).json({ noproductfound: 'No product found with that id' })
        );
});


// @route   PUT api/product/:id
// @desc    PUT update product by id
// @access  Public
router.put('/:id', function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => res.json(product))
        .catch(err =>
            res.status(404).json({ error: 'there is a probleming updating' })
        );

});

// @route   DELETE api/product/:id
// @desc    Delete product
// @access  public
router.delete(
    '/:id',
    (req, res) => {
        Product.findById(req.params.id)
            .then(product => {
                Product.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ productnotfound: 'No product found' }));
    }
);

/*
router.get('/search', (req, res) => {
    res.json({ msg: 'Product Works' });
    let searchObj = {};
    searchObj.city = req.query.city
    let groupBy = 'city';
    Product.aggregateAsync([
        { $match: searchObj },
        {
            $group: {
                _id: `$${groupBy}`,
            }
        },
    ]);

    Product.aggregate([
        {
            $lookup: {
               from: Company,
               localField: "company",
               foreignField: "_id",
               as: "company"
            }
        },
        {
            $unwind: "$company"
        },
        {
            $lookup: {
                from: "sivaUserInfo",
                localField: "userId",
                foreignField: "userId",
                as: "userInfo"
            }
        },
        {
            $unwind: "$userInfo"
        }
    ])
    .then((chartStats) => {
       
      res.send(chartStats);
    }).catch(err => res.status(404).json({ 'sdfs': err }));

});*/

module.exports = router;
