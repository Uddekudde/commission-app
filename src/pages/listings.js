import React, { useState, useEffect } from "react";
import ListingCard from "../components/listingCard";
import { makeStyles } from "@material-ui/core/styles";
import logo192 from "../components/logo192.png";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "90%",
    margin: "auto",
    flexWrap: "wrap"
  }
});

function Listings() {
  const classes = useStyles();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    axios.get("/offers").then(response => {
      setListings(response.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      {listings ? (
        listings.map(listing => (
          <ListingCard
            key={listing.offerId}
            thumbnail={logo192}
            title={listing.price}
            description={listing.description}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Listings;
