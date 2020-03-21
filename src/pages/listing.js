import React, { useEffect, Fragment } from "react";
import ProfileCard from "../components/profileCard";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getListingWithAuthor } from "../redux/actions/dataActions";

const styles = {
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  hr: {
    border: "0.5px solid #dddddd"
  },
  imageContainer: {
    position: "absolute",
    overflow: "hidden",
    left: "0%",
    width: "100%",
    height: "660px",
    display: "flex"
  },
  exampleImage: {
    height: "640px",
    left: "50%",
    marginTop: "10px",
    marginRight: "auto",
    marginLeft: "auto",
    zIndex: "1"
  },
  blurryBackground: {
    position: "absolute",
    objectFit: "cover",
    left: "-10%",
    width: "120%",
    height: "680px",
    filter: "blur(8px)",
    marginTop: "-10px"
  },
  imageSpacing: {
    width: "100%",
    height: "680px"
  },
  contentContainer: {
    display: "flex"
  },
  contentItem: {
    marginRight: "10px",
    maxWidth: "400px"
  }
};

function Listing(props) {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const listingId = props.match.params.id;
  const dispatch = useDispatch();
  const listing = useSelector(state => state.data.listing);

  useEffect(() => {
    dispatch(getListingWithAuthor(listingId));
  }, [dispatch, listingId]);

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
                <Typography variant="body1">{`${listing.description} what the fuck did you just say about me you ltitle shit? ill have you know`}</Typography>
              </CardContent>
            </Card>
            <ProfileCard user={listing.author} />
          </div>
        </Fragment>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Listing;
