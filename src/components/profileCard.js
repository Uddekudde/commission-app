import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import MuiLink from "@material-ui/core/Link";

const styles = {
  paper: {
    padding: 20,
    maxWidth: 400,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "black",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

function ProfileCard(props) {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const user = props.user;
  dayjs.extend(relativeTime);

  let profileMarkup = user ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={user.imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${user.handle}`}
            color="secondary"
            variant="h5"
          >
            {user.handle}
          </MuiLink>
          <hr />
          {user.bio && <Typography variant="body2">{user.bio}</Typography>}
          <hr />
          {user.location && (
            <Fragment>
              <LocationOn color="secondary" />
              <span>{user.location}</span>
              <hr />
            </Fragment>
          )}
          {user.website && (
            <Fragment>
              <LinkIcon color="secondary" />
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="secondary" />{" "}
          <span>Joined {dayjs(user.createdAt).fromNow()}</span>
        </div>
      </div>
    </Paper>
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
}

ProfileCard.propTypes = {
  user: PropTypes.object,
};

export default ProfileCard;
