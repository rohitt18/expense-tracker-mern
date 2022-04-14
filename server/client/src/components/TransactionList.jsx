import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Transaction from "./Transaction";

const TransactionList = () => {
  // const context = useContext(GlobalContext);
  // console.log(context);
  // use destructuring instead of context.transaction
  const { transactions, getTransactions } = useContext(GlobalContext);
  // transactions is an array therefore we need to map through it & then output each transaction

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} /> // it's passed in as a prop therefore we need to catch it in Transaction component
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
