import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import ListingCard from "../components/listingCard";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  postProjectRequest,
  getListingWithAuthor,
} from "../redux/actions/dataActions";

const styles = {
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  formContainer: {
    width: "400px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};

function RequestProject(props) {
  const history = useHistory();
  const listingId = props.match.params.id;
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const dispatch = useDispatch();
  const listing = useSelector((state) => state.data.listing);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    dispatch(getListingWithAuthor(listingId));
  }, [dispatch, listingId]);

  function handleChange(event) {
    if (event.target.name === "description") setDescription(event.target.value);
    else if (event.target.name === "name") setName(event.target.value);
    else if (event.target.name === "deadline") setDeadline(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestData = {};
    requestData.description = description;
    requestData.name = name;
    requestData.deadline = deadline;
    dispatch(postProjectRequest(listingId, history, requestData));
  }

  return (
    <div className={classes.root}>
      {!listing ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <Typography variant="h3" >
            {`New ${listing.title} project`}
          </Typography>
          <hr className={classes.hr}/>
          <div className={classes.flexContainer}>
            <div className={classes.formContainer}>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  name="name"
                  type="text"
                  label="Project name"
                  className={classes.textField}
                  value={name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  name="description"
                  type="text"
                  label="Description"
                  multiline
                  rows="3"
                  className={classes.textField}
                  value={description}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  name="deadline"
                  type="text"
                  label="Deadline"
                  className={classes.textField}
                  value={deadline}
                  onChange={handleChange}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  fullWidth
                >
                  Request project
                </Button>
              </form>
            </div>
            <ListingCard
              thumbnail={listing.imageUrl}
              title={listing.title}
              description={listing.description}
              price={listing.price}
              listing={listing.offerId}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default RequestProject;
