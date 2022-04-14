const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  // In our application, we have the fields: id, text, amount
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export it so that we can bring it into our controller

module.exports = mongoose.model("Transaction", TransactionSchema);
