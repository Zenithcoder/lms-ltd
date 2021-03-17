const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    if (!Validator.isLength(data.name, { min: 1, max: 300 })) {
        errors.name = 'name must be between 1 and 300 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }
    if (Validator.isEmpty(data.status)) {
        errors.name = 'status field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
