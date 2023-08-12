import { createContext, useReducer, useEffect } from "react";
import { UserProfileStateContext } from "../utils/types";
import {
  ACTION_TYPES,
  ActionType,
  profileReducer,
} from "../reducers/profileReducer";
import { getUserProfile } from "../utils/fetchApi";

type PropTypes = {
  children?: React.ReactNode;
};

const initialState: UserProfileStateContext = {
  userProfile: {},
};
//spent fucking 1 1/2 days because useReducer was not inferring the correct type IKMS
export interface IContext {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
}

export const ContextApp = createContext<IContext>({
  state: initialState,
  dispatch: () => { },
});

export default function UserContext({ children }: PropTypes) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const fetchData = async () => {
    //TODO send error response from server user not logged in if get profile returns null or empty
    getUserProfile()
    .then((data) => {
      dispatch({ type: ACTION_TYPES.INITIALIZE, payload: { userProfile: data } })
    })
    .catch((error) => {
      console.log({ message: error });
      dispatch({ type: ACTION_TYPES.LOGOUT, payload: {} })
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      {children}
    </ContextApp.Provider>
  );
}
