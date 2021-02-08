import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (product) => {
  if (product && product.ratings) {
    const ratingsArray = product && product.ratings;
    let total = [];
    const length = ratingsArray.length;

    ratingsArray.map((rating) => total.push(rating.star));

    const totalReduced = total.reduce((prev, next) => prev + next, 0);

    const highest = length * 5;

    const result = (totalReduced * 5) / highest;

    return (
      <div className="pt-3 pb-1">
        <span>
          <StarRating
            rating={result}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
          />{" "}
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};
