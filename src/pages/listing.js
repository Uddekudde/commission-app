import React, { useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import ProfileCard from "../components/profileCard";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getListingWithAuthor,
  deleteListing,
} from "../redux/actions/dataActions";

const styles = {
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  imageContainer: {
    position: "absolute",
    overflow: "hidden",
    left: "0%",
    width: "100%",
    height: "660px",
    display: "flex",
  },
  exampleImage: {
    height: "640px",
    left: "50%",
    marginTop: "10px",
    marginRight: "auto",
    marginLeft: "auto",
    zIndex: "1",
  },
  blurryBackground: {
    position: "absolute",
    objectFit: "cover",
    left: "-10%",
    width: "120%",
    height: "680px",
    filter: "blur(8px)",
    marginTop: "-10px",
  },
  imageSpacing: {
    width: "100%",
    height: "680px",
  },
  contentContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  contentItem: {
    marginRight: "10px",
    marginBottom: "10px",
    maxWidth: "360px",
    minWidth: "300px",
  },
};

function Listing(props) {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const listingId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const listing = useSelector((state) => state.data.listing);
  const user = useSelector((state) => state.user);
  const userHandle = user.credentials.handle;

  useEffect(() => {
    dispatch(getListingWithAuthor(listingId));
  }, [dispatch, listingId]);

  function handleClick() {
    dispatch(deleteListing(listingId, history));
  }

  return (
    <div className={classes.root}>
      {listing ? (
        <Fragment>
          <div className={classes.imageContainer}>
            <img
              src={listing.imageUrl}
              alt="profile"
              className={classes.blurryBackground}
            />
            <img
              src={listing.imageUrl}
              alt="profile"
              className={classes.exampleImage}
            />
          </div>
          <div className={classes.imageSpacing} />
          <Typography variant="h4">{listing.title}</Typography>
          <hr className={classes.hr} />
          <div className={classes.contentContainer}>
            <Card className={classes.contentItem}>
              <CardContent>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body1">{`${listing.description}`}</Typography>
              </CardContent>
            </Card>
            <div className={classes.contentItem}>
              <ProfileCard user={listing.author} />
            </div>
            <Card className={classes.contentItem}>
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/projects/new/${listing.offerId}`}
                  fullWidth
                >
                  <Typography variant="body1">Request Project</Typography>
                </Button>
                {listing.handle === userHandle ? (
                  <Button variant="contained" color="secondary" fullWidth>
                    <Typography onClick={handleClick} variant="body1">
                      Delete Listing
                    </Typography>
                  </Button>
                ) : (
                  <div />
                )}

                <hr className={classes.hr} />
                <Typography variant="body1">Starting at</Typography>
                <Typography variant="h4">{`$${listing.price}`}</Typography>
              </CardContent>
            </Card>
          </div>
        </Fragment>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Listing;
