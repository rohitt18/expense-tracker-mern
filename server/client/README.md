# Getting Started with Create React App

`npx create-react-app`

## Create components for everything

Header
Balance component
Income/Expense component
Transaction list with transaction components inside of it
Add transaction component

### ContextAPI

We could put our state right in the app file & not use the contextAPI at all &
basically just prop drill i,e pass props down which isn't a bad idea for a small application
however i'm using contextAPI so that in future projects im familiar with using the contextAPI
with hooks (useReducer, useContext) bec thats most likely what we'll be using in larger applications
either this or Redux

Step 1: Setup the Initial state
Step 2: Create the Global Context using createContext (also known as store)
Step 3: Now, in order for other components to have access to our store (globalState),
we need to have a Provider, we basically need to wrap all the components in a Provider
& since we're wrapping all the components by this therefore those are gonna be the children.
And in here, we need to use our useReducer bec we need access to state & dispatch
whenever we want to call a reducer action we need to use the dispatch
const [state,dispatch] = useReducer(wherever our reducer is, initialState)
and return (<GlobalContext.Provider value={{transactions:state.transactions}}>
{children}
</GlobalContext.Provider>);
The Provider provides the state, it provides any actions to the components that its wrapped around
Step 4: Setup the reducer (bare minimum provide the default case atleast)
Step 5: Start pulling the global state wherever needed using the useContext hook.
Conclusion: So now if we look in the reducer, we will have our transactions array. Therefore its now
accessible to any components that need it such as TransactionList, Balance, IncomeExpenses
We are gonna need the transactions for all that stuff.

### Actions

After we have the transactions (properties) from the state coming in to all the components that need it
start working on some actions like adding the transactions & deleting the transactions

create actions in the GlobalProvider for eg:

const deleteTransaction = (id) => {
dispatch({ type: "DELETE_TRANSACTION", payload: id });
};

Once we have the action :-
Make sure to pass it in the provider value so that we can access it through other components
Now we need to create a case for this in our reducer for eg:

case "ADD_TRANSACTION":
return {
...state,
// return the transactions which are already there + the new one which is in the payload
// we can do this by setting this to an array & we can get the initial transactions by using the spread operator
// so the spread just basically takes out all the values from the array and puts them in here and then in addition to that we want our action.payload which is our new //// transaction so thats being added
transactions: [...state.transactions, action.payload],
};
