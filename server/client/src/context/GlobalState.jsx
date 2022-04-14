import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// Initial state (which is going to be a single object so any global state would go on this object)
// however all we need is our transactions bec as long as we have access to the transactions in
// certain components we can do our calculations there (for like tha balance & stuff like that)
// we dont need that stuff in our state we just need to be able to pass this data down
// & then we'll have actions for eg: delete/add transactions

const initialState = {
  transactions: [],
  erorr: null,
  loading: true,
};

// now we need to create our GlobalContext using the createContext
export const GlobalContext = createContext(initialState);

// Provider Component
// & since we're wrapping all the components by this therefore those are gonna be the children
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get("/api/v1/transactions");
      // res.data will give us the entire object so res.data.data will give us the transactions array
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    // since we're actually sending data so we need a content type (config and pass it as a third parameter)
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction, // so now we should be able to pull this out just like we did transactions
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
