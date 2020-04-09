import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    width: 335,
    margin: 10
  },
  media: {
    height: "200px"
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  }
};

function ListingCard(props) {
  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis, ...styles });
  const classes = useStyles();
  const { thumbnail, title, description } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/listings/${props.listing}`}>
        <CardMedia
          alt="Example image"
          className={classes.media}
          image={thumbnail}
          title="Example image"
        />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography noWrap={true} variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.priceContainer}>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          component={Link}
          to={`/listings/${props.listing}`}
        >
          {`$${props.price}`}
        </Button>
      </CardActions>
    </Card>
  );
}

ListingCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  listing: PropTypes.string.isRequired
};

export default ListingCard;
