const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
   
});

module.exports = Post = mongoose.model('product', ProductSchema);
