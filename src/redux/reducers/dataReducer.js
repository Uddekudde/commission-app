import {
  SET_LISTINGS,
  SET_LISTING,
  LOADING_DATA,
  SET_PROJECTS,
  SET_OUTBOUND_PROJECTS,
} from "../types";

const initialState = {
  listings: null,
  listing: null,
  projects: null,
  outboundProjects: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        loading: false,
      };
    case SET_LISTING:
      return {
        ...state,
        listing: action.payload,
        loading: false,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload.replies,
        loading: false,
      };
    case SET_OUTBOUND_PROJECTS:
      return {
        ...state,
        outboundProjects: action.payload.replies,
        loading: false,
      };
    default:
      return state;
  }
};
