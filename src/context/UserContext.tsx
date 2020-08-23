import React, { useReducer } from "react";

interface Istate {
  users: [];
  selectedUser: {};
  loading: boolean;
  newUser: { name: string; job: string };
  error: string;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState = {
  users: [],
  selectedUser: {},
  loading: true,
  error: "",
  newUser: { name: "", job: "" },
};

export const UserContext = React.createContext<Istate | any>(initialState);

const reducer = (state: Istate, action: IAction) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };

    case "FETCH_USER":
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
        error: null,
      };

    case "CREATE_USER":
      return {
        ...state,
        loading: false,
        newUser: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export const UserContextProvider: React.FC = (props) => {
  // const [users, setUsers] = useState<User[]>([]);
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
