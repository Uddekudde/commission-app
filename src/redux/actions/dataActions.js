import { SET_LISTINGS, LOADING_DATA } from "../types";

import { getUserData } from "./userActions";
import axios from "axios";

export const postListing = formData => dispatch => {
  axios
    .post("/offer", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const getListings = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/offers")
    .then(response => {
      dispatch({
        type: SET_LISTINGS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_LISTINGS,
        payload: []
      });
    });
};
