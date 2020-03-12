import React, { useState, useEffect } from "react";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
//redux
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails, uploadImage } from "../redux/actions/userActions";

const styles = {
  hr: {
    borderTop: "1px solid #dbdbdb"
  },
  hrInvis: {
    border: "none"
  },
  paper: {
    margin: "10px 0 10px 0",
    padding: 20,
    maxWidth: 400,
    display: "flex",
    justifyContent: "space-between"
  },
  profileImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "10%"
  },
  button: {
    margin: "auto 0 auto 0"
  },
  bold: {
    fontWeight: "500"
  }
};

function EditProfile() {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const userData = userState.credentials;
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    mapCredentialsToState(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event) {
    if (event.target.name === "bio") setBio(event.target.value);
    else if (event.target.name === "website") setWebsite(event.target.value);
    else if (event.target.name === "location") setLocation(event.target.value);
  }

  function handleSubmit(event) {
    const profileData = {
      bio: bio,
      website: website,
      location: location
    };
    dispatch(editUserDetails(profileData));
  }

  function handleImageChange(event) {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  }

  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  function mapCredentialsToState(credentials) {
    setBio(userData.bio ? userData.bio : "");
    setWebsite(userData.website ? userData.website : "");
    setLocation(userData.location ? userData.location : "");
  }

  return (
    <div className={classes.formContainer}>
      <Typography variant="h4" className={classes.title}>
        Profile Details
      </Typography>
      <hr className={classes.hr} />
      <Typography variant="h5" align="left" className={classes.title}>
        Profile Image
      </Typography>
      <Paper className={classes.paper}>
        <img
          src={userData.imageUrl}
          alt="profile"
          className={classes.profileImage}
        />
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <Tooltip
          title={`Upload a new profile image.\n Square images work best.`}
          placement="top"
        >
          <Button
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={handleEditPicture}
          >
            Upload image
          </Button>
        </Tooltip>
      </Paper>
      <Typography variant="h5" align="left" className={classes.title}>
        Bio
      </Typography>
      <TextField
        variant="outlined"
        name="bio"
        type="text"
        label="Add your bio"
        className={classes.textField}
        value={bio}
        multiline
        rows="3"
        onChange={handleChange}
        fullWidth
      />
      <Typography variant="h5" align="left" className={classes.title}>
        Website
      </Typography>
      <TextField
        variant="outlined"
        name="website"
        type="text"
        label="Add your website"
        className={classes.textField}
        value={website}
        onChange={handleChange}
        fullWidth
      />
      <Typography variant="h5" align="left" className={classes.title}>
        Location
      </Typography>
      <TextField
        variant="outlined"
        name="location"
        type="text"
        label="Add your location"
        className={classes.textField}
        value={location}
        onChange={handleChange}
        fullWidth
      />
      <hr className={classes.hrInvis} />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleSubmit}
        fullWidth
      >
        Submit
      </Button>
    </div>
  );
}

export default EditProfile;
