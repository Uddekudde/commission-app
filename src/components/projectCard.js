import React from "react";
import PropTypes from "prop-types";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  project: {
    margin: "10px",
  },
  profileImage: {
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    marginLeft: "10px",
    cursor: "pointer",
  },
  cardItem: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  statusButton: {
    marginTop: "10px",
    marginLeft: "10px",
  },
  accept: {
    background: "#4aa863",
    color: "white",
  },
  decline: {
    background: "#e64f49",
    color: "white",
  },
};

function ProjectCard(props) {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const project = props.project;

  return (
    <Card className={classes.project}>
      <CardContent className={classes.flexContainer}>
        <Typography variant="h6" className={classes.cardItem}>
          {project.name}
        </Typography>
        <Typography
          variant="body1"
          className={classes.cardItem}
        >{`Deadline: ${project.deadline}`}</Typography>
        {!props.outbound ? (
          <div>
            <Button
              variant="contained"
              disabled={project.status !== "open"}
              className={`${classes.statusButton} ${classes.accept}`}
              onClick={() => props.handleConfirm(project.replyId, "accepted")}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              disabled={project.status !== "open"}
              className={`${classes.statusButton} ${classes.decline}`}
              onClick={() => props.handleConfirm(project.replyId, "declined")}
            >
              Decline
            </Button>
          </div>
        ) : (
          <div />
        )}

        <img
          src={project.userImage}
          alt="profile"
          className={classes.profileImage}
        />
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  handleConfirm: PropTypes.func,
  outbound: PropTypes.bool.isRequired,
};

export default ProjectCard;
