const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please select category'],
    enum: [
      'Fish Medicines',
      'Aquarium Tanks',
      'Filters',
      'Heaters',
      'Fish Foods',
      'Aquarium Lights',
      'Planted Tank Lights',
      'Live Fishes',
      'Aquarium Accessories',
      'Aquarium Stones and Sands',
      'Dog Foods',
      'Cat Foods',
      'Pet Accessories'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);