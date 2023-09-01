// import { InitialContext } from "../components/UserContext";
import { UserProfileStateContext, UserProfileType } from "../utils/types";

export const enum ACTION_TYPES {
  INITIALIZE = 'INITIALIZE',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
  UPDATEPAYMENT = 'UPDATEPAYMENT',
  DELETEPAYMENT = 'DELETEPAYMENT',
}
export type ActionType = {
    type: ACTION_TYPES,
    payload: Partial<UserProfileType> | Record<PropertyKey, never>,
}

export function profileReducer(state: UserProfileStateContext, action: ActionType) {
  switch (action.type) {
    case ACTION_TYPES.INITIALIZE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.LOGIN: {
      return {
        ...state, 
        userProfile: action.payload
      }
    }
    case ACTION_TYPES.LOGOUT: {
       return {userProfile: {}};
    }
    case ACTION_TYPES.UPDATEPAYMENT: {

      return {
        ...state.userProfile,
        userProfile: {
          ...state.userProfile,
          provider: action.payload.provider,
          account_number: action.payload.account_number,
          expires: action.payload.expires
        }

      };
   }
   case ACTION_TYPES.DELETEPAYMENT: {

    return {
      ...state.userProfile,
      userProfile: {
        ...state.userProfile,
        provider: undefined,
        account_number: undefined,
        expires: undefined
      }

    };
 }
    default: {
      return state;
    }
  }
}
