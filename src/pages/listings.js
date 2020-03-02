import React from "react";
import ListingCard from "../components/listingCard";
import logo192 from "../components/logo192.png";

const placeholder = "digital media";

function Listings() {
  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        margin: "auto",
        flexWrap: "wrap"
      }}
    >
      <ListingCard
        thumbnail={logo192}
        title={"digital painting"}
        description={placeholder}
      />
      <ListingCard
        thumbnail={logo192}
        title={"digital painting"}
        description={placeholder}
      />
      <ListingCard
        thumbnail={logo192}
        title={"digital painting"}
        description={placeholder}
      />
    </div>
  );
}

export default Listings;
