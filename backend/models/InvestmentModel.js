import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
  name: { type: String }, // Optional if symbol is provided
  symbol: { type: String }, // Optional if name is provided
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  price: { type: Number, default: 0 } // Added price field
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Optional index for common query patterns
InvestmentSchema.index({ type: 1, name: 1, symbol: 1 });

const Investment = mongoose.model('Investment', InvestmentSchema);

export default Investment;
