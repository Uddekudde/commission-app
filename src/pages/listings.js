import React, { useState, useEffect } from "react";
import ListingCard from "../components/listingCard";
//MUI
import { makeStyles } from "@material-ui/core/styles";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getListings } from "../redux/actions/dataActions";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
});

function Listings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listings = useSelector(state => state.data.listings);

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {listings ? (
        listings.map(listing => (
          <ListingCard
            key={listing.offerId}
            thumbnail={listing.imageUrl}
            title={listing.title}
            description={listing.description}
            price={listing.price}
            listing={listing.offerId}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Listings;
