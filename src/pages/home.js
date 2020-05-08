import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/profileCard";
import ProjectCard from "../components/projectCard";
//Mui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectRequests,
  getOutboundProjectRequests,
  confirmProject,
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
  heading: {
    marginTop: "150px",
    maxWidth: "450px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  subHeading: {
    marginTop: "20px",
    maxWidth: "450px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #ff4081 90%)",
    marginTop: "40px",
    marginLeft: "42%",
    marginRight: "42%",
  },
};

function Home() {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const userState = useSelector((state) => state.user);
  const userData = userState.credentials;
  const projects = useSelector((state) => state.data.projects);
  const OutboundProjects = useSelector((state) => state.data.outboundProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectRequests());
    dispatch(getOutboundProjectRequests());
  }, [dispatch]);

  function handleConfirm(replyId, status) {
    let statusData = { status: status };
    dispatch(confirmProject(replyId, statusData));
  }

  return (
    <div>
      {userState.authenticated ? (
        projects ? (
          <Fragment>
            <Typography variant="h5">Projects</Typography>
            <div className={classes.flexContainer}>
              <Button>Pending</Button>
              <Button>active</Button>
              <Button>declined</Button>
            </div>
            <hr className={classes.hr} />
            {projects.map((project) => (
              <ProjectCard
                key={project.replyId}
                project={project}
                handleConfirm={handleConfirm}
                outbound={false}
              />
            ))}
            <Typography variant="h5">Requested Projects</Typography>
            <hr className={classes.hr} />
            {OutboundProjects ? (
              OutboundProjects.map((project) => (
                <ProjectCard
                  key={project.replyId}
                  project={project}
                  outbound={true}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Fragment>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <Fragment>
          <Typography
            variant="h4"
            align="center"
            className={`${classes.nunitoLight} ${classes.heading}`}
          >
            Commission app helps you find and advertise art commissions.
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={`${classes.nunitoLight} ${classes.subHeading}`}
          >
            Create listings with examples of your work and get requests from
            clients or find the right creator for a custom commission.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            color="secondary"
            className={classes.button}
          >
            start advertising
          </Button>
        </Fragment>
      )}
    </div>
  );
}

export default Home;
