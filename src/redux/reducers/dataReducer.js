import { SET_LISTINGS, LOADING_DATA } from "../types";

const initialState = {
  listings: null,
  listing: {},
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

    default:
      return state;
  }
};
