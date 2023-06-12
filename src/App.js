import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  activeLoan: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: !state.isActive };
    case "deposit":
      if (state.isActive)
        return { ...state, balance: state.balance + action.payload };
      return { ...state };
    case "withdraw":
      if (state.isActive)
        return { ...state, balance: state.balance - action.payload };
      return "";
    case "requestLoan":
      if (state.activeLoan)
        return {
          ...state,
          balance: state.balance + action.payload,
          activeLoan: !state.activeLoan,
          loan: state.loan + action.payload,
        };
      return { ...state };
    case "payLoan":
      if (!state.activeLoan)
        return {
          ...state,
          balance: state.balance - state.loan,
          activeLoan: !state.activeLoan,
          loan: 0,
        };
      if (state.activeLoan) return { ...state };
      break;
    case "closeAccount":
      if (state.balance === 0 && state.loan === 0) return { ...initialState };
      return { ...state };
    default:
      return new Error("");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
