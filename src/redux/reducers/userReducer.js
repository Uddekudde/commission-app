import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        notifications: action.payload.notifications
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case MARK_NOTIFICATIONS_READ:
      let newState = { ...state };
      newState.notifications.forEach(
        notification => (notification.read = true)
      );
      return {
        ...newState
      };
    default:
      return state;
  }
}
