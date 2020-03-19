import React, { useState } from "react";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//redux
import { useDispatch } from "react-redux";
import { postListing } from "../redux/actions/dataActions";

function CreateListing() {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis });
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  function handleChange(event) {
    if (event.target.name === "description") setDescription(event.target.value);
    else if (event.target.name === "title") setTitle(event.target.value);
    else if (event.target.name === "price") setPrice(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image, image.name);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("price", price);
    dispatch(postListing(formData));
  }

  return (
    <div className={classes.formContainer}>
      <Typography variant="h3" className={classes.title}>
        Create Listing
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <Button className={classes.button} onClick={handleEditPicture}>
          Upload image
        </Button>
        <TextField
          variant="outlined"
          name="title"
          type="text"
          label="Title"
          className={classes.textField}
          value={title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          name="description"
          type="text"
          label="Description"
          className={classes.textField}
          value={description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          name="price"
          type="text"
          label="Price"
          className={classes.textField}
          value={price}
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
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateListing;
