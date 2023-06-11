import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export function handleRatingUpdate(note, setNote, postId, ratingValue) {
  const auth = getAuth();
  //check if the user is author of the note
  if (note.userRef === auth.currentUser.uid) {
    console.log("Cannot rate your own note.");
    return;
  }
  // Check if the user has already rated the note
  if (note.ratedBy.includes(auth.currentUser.uid)) {
    console.log("Already rated this note.");
    return;
  }
  // Calculate new average rating
  const currentRating = note.rating || 0;
  const totalRatings = note.totalRatings || 0;
  const newTotalRatings = totalRatings + 1;
  const newAverageRating =
    (currentRating * totalRatings + ratingValue) / newTotalRatings;

  // Update rating in Firestore
  const docRef = doc(db, "listings", postId);
  updateDoc(docRef, {
    rating: newAverageRating,
    totalRatings: newTotalRatings,
    ratedBy: [...note.ratedBy, auth.currentUser.uid],
  })
    .then(() => {
      console.log("Rating successfully updated in Firestore!");
      // Update the note object in the state
      setNote((prevNote) => ({
        ...prevNote,
        rating: newAverageRating,
        totalRatings: newTotalRatings,
        ratedBy: [...prevNote.ratedBy, auth.currentUser.uid],
      }));
    })
    .catch((error) => {
      console.error("Error updating rating in Firestore: ", error);
    });
}

function StarRating({ rating, onUpdateRating, clickable }) {
  const [hover, setHover] = useState(null);

  const handleRatingClick = (ratingValue) => {
    if (clickable && onUpdateRating) {
      onUpdateRating(ratingValue);
    }
  };

  const averageRating = (Math.round(rating * 2) / 2).toFixed(1);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (averageRating >= i + 1) {
      // Full star
      stars.push(<FaStar key={i} color='#ffc107' />);
    } else if (averageRating >= i + 0.5) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} color='#ffc107' />);
    } else {
      // Empty star
      stars.push(<FaStar key={i} style={{ opacity: 0.5 }} color='#ffdd37' />);
    }
  }

  /*return (
    <div style={{ display: "flex" }}>
      {stars.map((star, index) => (
        <div
          key={index}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(null)}
          onClick={() => handleRatingClick(index + 1)}
          style={{ cursor: "pointer" }}
        >
          {star}
        </div>
      ))}
    </div>
    
  );*/

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", marginRight: "0.5rem" }}>
        {stars.map((star, index) => (
          <div
            key={index}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRatingClick(index + 1)}
            style={{ cursor: clickable ? "pointer" : "default" }}
          >
            {star}
          </div>
        ))}
      </div>
      <div style={{ color: "#005696" }}>{averageRating}</div>{" "}
      {/* Display average rating */}
    </div>
  );
}
export default StarRating;
