import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore"; 
function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);

    // Update rating in Firestorez
    db.collection("listings")
      .doc("unique-rating-document-id")
      .update({
        rating: ratingValue,
      })
      .then(() => {
        console.log("Rating successfully saved to Firestore!");
      })
      .catch((error) => {
        console.error("Error saving rating to Firestore: ", error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            size={30}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRatingClick(ratingValue)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
}

export default StarRating;
