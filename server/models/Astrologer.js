const mongoose = require('mongoose');
const { type } = require('os');

const Astrologer = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: [String], 
    enum: ['Vedic', 'Numerology', 'Vastu', 'Prashana'], 
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  experience: {
    type: Number,
    required: true, // Number of years
  },
  description: {
    type: String,
    maxlength: 1500, // Support up to 1000 characters
  },
  rating: {
    type: Number,
    default: 0,
  },
  orders: {
    type: Number,
    default: 0,
  },
  pricePerMinute: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  
  totalChatTime:{
    type:String,
    default:"0"
  },
  totalCallTime:{
    type:String,
    default:"0"
  }
});

const Astrologerschema = mongoose.model('Astrologer', Astrologer);

module.exports = Astrologerschema;