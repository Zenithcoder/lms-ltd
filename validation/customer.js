const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCustomerInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.city = !isEmpty(data.city) ? data.city : '';

    if (!Validator.isLength(data.name, { min: 1, max: 300 })) {
        errors.name = 'name must be between 1 and 300 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }
    if (Validator.isEmpty(data.city)) {
        errors.name = 'city field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
