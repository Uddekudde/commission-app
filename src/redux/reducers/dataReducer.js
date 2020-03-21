import { SET_LISTINGS, SET_LISTING, LOADING_DATA } from "../types";

const initialState = {
  listings: null,
  listing: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        loading: false
      };
    case SET_LISTING:
      return {
        ...state,
        listing: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
