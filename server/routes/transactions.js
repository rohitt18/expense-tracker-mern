const express = require("express");
const router = express.Router();

const {
  getTransactions,
  deleteTransaction,
  addTransaction,
} = require("../controllers/transactions");

router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
