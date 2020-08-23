import React, { useReducer } from "react";

interface Istate {
  user: { email: string; password: string };
  loading: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState = {
  user: {},
  loading: false,
};

export const AuthContext = React.createContext<Istate | any>(initialState);

const reducer = (state: Istate, action: IAction) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case "REGISTER":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
