import React, { Fragment, useEffect } from "react";
import ProfileCard from "../components/profileCard";
//Mui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getProjectRequests } from "../redux/actions/dataActions";

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
    marginTop: "20px",
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
};

function Home() {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const userState = useSelector((state) => state.user);
  const userData = userState.credentials;
  const projects = useSelector((state) => state.data.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectRequests());
  }, [dispatch]);

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
              <Card key={project.createdAt} className={classes.project}>
                <CardContent className={classes.flexContainer}>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body1">{`Description: ${project.description}`}</Typography>
                  <Typography variant="body1">{`Deadline: ${project.deadline}`}</Typography>
                  <img
                    src={project.userImage}
                    alt="profile"
                    className={classes.profileImage}
                  />
                </CardContent>
              </Card>
            ))}
          </Fragment>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <div />
      )}
    </div>
  );
}

export default Home;
