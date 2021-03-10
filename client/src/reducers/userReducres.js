import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_RESET,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_RESET,
  UPDATE_USER_PASSWORD_FAIL,

} from "../constants/userConstants";
const initialState = {};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.data.user,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_PROFILE":
    case "UPDATE_USER_PASSWORD":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_USER_PROFILE_SUCCESS":
    case "UPDATE_USER_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.data.success,
      };
    case "UPDATE_USER_PROFILE_RESET":
    case "UPDATE_USER_PASSWORD_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "UPDATE_USER_PROFILE_FAIL":
    case "UPDATE_USER_PASSWORD_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case "CLEAR_ERROR":
        return {
          ...state,
          error: null
        }
    default:
      return state;
  }
};
