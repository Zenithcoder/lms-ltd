const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('company', CompanySchema);
