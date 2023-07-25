// import { InitialContext } from "../components/ContextProvider";
import { UserProfileStateContext, UserProfileType } from "../utils/types";

export const enum ACTION_TYPES {
  INITIALIZE = 'INITIALIZE',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
}
export type ActionType = {
    type: ACTION_TYPES,
    payload: Partial<UserProfileType> | {},
}

export function profileReducer(state: UserProfileStateContext, action: ActionType) {
  switch (action.type) {
    case ACTION_TYPES.INITIALIZE: {
        console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.LOGIN: {
      console.log(action.payload)
      return {
        ...state,
        userProfile: action.payload
      }
    }
    case ACTION_TYPES.LOGOUT: {
       return {userProfile: {}};
    }
    default: {
      return state;
    }
  }
}
