const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (!Validator.isLength(data.name, { min: 1, max: 300 })) {
        errors.name = 'name must be between 1 and 300 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }
    if (Validator.isEmpty(data.price)) {
        errors.name = 'price field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
