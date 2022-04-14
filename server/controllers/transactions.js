const Transaction = require("../models/Transaction");
// now we can use mongoose methods on this like find(),create(),remove(),etc

const getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transaction.length,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const addTransaction = async (req, res) => {
  const { text, amount } = req.body;
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    } else {
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, errror: "No transaction found" });
    }
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };
