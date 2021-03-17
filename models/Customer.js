const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    
});

module.exports = Profile = mongoose.model('customer', CustomerSchema);
