import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import numberWithCommas from "../utils/format";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  // console.log(amounts);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((amount) => amount < 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) *
    -(1).toFixed(2);

  // console.log(income);
  // console.log(expense);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₹{numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
