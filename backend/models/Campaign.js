const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amountNeeded: { type: Number, required: true },
  amountRaised: { type: Number, default: 0 },
  deadline: { type: String, required: true },
  image: { type: String }, // URL to image/proof
  
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);