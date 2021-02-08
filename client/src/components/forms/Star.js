import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ number, starClick }) => {
  return (
    <>
      <StarRating
        numberOfStars={number}
        changeRating={() => starClick(number)}
        starRatedColor="red"
        starSpacing="2px"
        starDimension="20px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );
};

export default Star;
