// reducer - its basically how we specify the application state changes in response to certain actions
// to our store or context
// In layman terms - reducer is just a way to change your state & send it down to your component

// reducer function
const reducer = (state, action) => {
  // state - state right before the update & action - what we're trying to do
  // keep in mind that you always need to return some kind of state from reducer otherwise none of the functionality will work

  // we cant just change the state we have to basically create a new state & send it down
  // so we use the spread operator to send the current state & override the changes on it.
  // here we wanna change the transactions value & we wanna set this to basically send down all the transactions
  // except the one that was deleted (as we have that id)

  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      const newTransaction = state.transactions.filter(
        (transaction) => transaction._id !== action.payload
      );
      return {
        ...state,
        transactions: newTransaction,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        // return the transactions which are already there + the new one which is in the payload
        // we can do this by setting this to an array & we can get the initial transactions by using the spread operator
        // so the spread just basically takes out all the values from the array and puts them in here and then in addition to that we want our action.payload which is our new transaction so thats being added
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
