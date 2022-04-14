import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import numberWithCommas from "../utils/format";

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  // console.log(amounts);

  // to calculate the sum of all the numbers in an array
  const total = amounts
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0)
    .toFixed(2);
  // toFixed(2) to get 2 decimal places
  // console.log(total);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>₹{numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
