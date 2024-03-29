// import { InitialContext } from "../components/UserContext";
import { UserProfileStateContext, UserProfileType } from "../utils/types";

export const enum ACTION_TYPES {
  INITIALIZE = "INITIALIZE",
  LOGOUT = "LOGOUT",
  LOGIN = "LOGIN",
  UPDATEPAYMENT = "UPDATEPAYMENT",
  DELETEPAYMENT = "DELETEPAYMENT",
  UPDATEEMAIL = "UPDATEEMAIL",
  UPDATEADDRESS = "UPDATEADDRESS",
  DELETEADDRESS = "DELETEADDRESS",
}
// TODO fix type: had to use any instead of Record<PropertyKey, never>. using record here because {} object causes problems

export type ActionType = {
  type: ACTION_TYPES;
  payload: Partial<UserProfileType> | any;
};

export function profileReducer(
  state: UserProfileStateContext,
  action: ActionType
) {
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
        userProfile: action.payload,
      };
    }
    case ACTION_TYPES.LOGOUT: {
      return { userProfile: {} };
    }
    case ACTION_TYPES.UPDATEPAYMENT: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          provider: action.payload.provider,
          account_number: action.payload.account_number,
          expires: action.payload.expires,
        },
      };
    }
    case ACTION_TYPES.DELETEPAYMENT: {
      const newState = removeObjectsFromState(state, action.payload)
      return {
        ...state,
        userProfile: {
          ...newState
        },
      };
    }
    case ACTION_TYPES.UPDATEEMAIL: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          email_address: action.payload.email_address,
        },
      };
    }
    case ACTION_TYPES.UPDATEADDRESS: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          address_line1: action.payload.address_line1,
          address_line2: action.payload.address_line2,
          city: action.payload.city,
          zip_code: action.payload.zip_code,
          country_code: action.payload.country_code,
        },
      };
    }
    case ACTION_TYPES.DELETEADDRESS: {
      const newState = removeObjectsFromState(state, action.payload)
      return {
        ...state,
        userProfile: {
          ...newState
        }
      };
    }
    default: {
      return state;
    }
  }
}


const removeObjectsFromState = (state: UserProfileStateContext, obj: Partial<UserProfileType> | Record<PropertyKey, never>) => {
  const newState = Object.fromEntries(
    Object.entries(state.userProfile).filter(([key, value]) => {
      if (
        !Object.keys(obj).find(item => item === key)
      ) {
        return [key, value]
      }
      return null
    })
  )
  return newState
}