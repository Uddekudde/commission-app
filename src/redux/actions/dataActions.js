import {
  SET_LISTINGS,
  SET_LISTING,
  LOADING_DATA,
  SET_ERRORS,
  SET_PROJECTS,
} from "../types";

import { getUserData } from "./userActions";
import axios from "axios";

export const postListing = (formData) => (dispatch) => {
  axios
    .post("/offer", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const getListings = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/offers")
    .then((response) => {
      dispatch({
        type: SET_LISTINGS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_LISTINGS,
        payload: [],
      });
    });
};

export const getListingWithAuthor = (listingId) => (dispatch) => {
  dispatch({ type: SET_LISTING, payload: null });
  axios
    .get(`/offer/${listingId}`)
    .then((response) => {
      dispatch({
        type: SET_LISTING,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_LISTING,
        payload: null,
      });
    });
};

export const postProjectRequest = (listingId, history, formData) => (
  dispatch
) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/offer/${listingId}/reply`, formData)
    .then((response) => {
      dispatch(getUserData());
      history.push("/");
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response.data }));
};

export const getProjectRequests = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/replies")
    .then((response) => {
      dispatch({ type: SET_PROJECTS, payload: response.data });
    })
    .catch((err) => console.log(err));
};
