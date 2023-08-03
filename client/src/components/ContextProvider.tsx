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

export default function ContextProvider({ children }: PropTypes) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  useEffect(() => {
    console.log('useEffect')
    const fetchData = async () => {
      //TODO send error response from server user not logged in if get profile returns null or empty
      return await getUserProfile();
    };

    fetchData()
      .then(d => {
        dispatch({ type: ACTION_TYPES.INITIALIZE, payload: { userProfile: d } })
      })
      .catch((error) => {
        console.log({ message: error });
        dispatch({ type: ACTION_TYPES.LOGOUT, payload: {} })
      });
  }, []);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      {children}
    </ContextApp.Provider>
  );
}
