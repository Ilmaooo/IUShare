import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import defaultpic from "../img/open-book.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import StarRating from "./StarRating";

//import post from "../img/post-view.png";

/*
A single Post View that is used as a component in Profile page. 

*/

export default function PostView({ note, id }) {
  const averageRating = Math.round(note.rating * 2) / 2; // Round the average rating to the nearest half value
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
  return (
    <li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] '>
      <Link className='contents' to={`/category/${note.coursecode}/${id}`}>
        <img
          className='h-[150px] w-[150] object-cover hover:scale-105 transition-scale duration-200 ease-in'
          loading='lazy'
          src={defaultpic}
          alt='defaultpic'
        />

        <Moment
          className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg'
          fromNow
        >
          {note.timestamp?.toDate()}
        </Moment>
        <div className='p-4'>
          <h2 className='text-xl font-bold text-[#005696]'>{note.username}</h2>
          <h2 className='font-bold underline'>
            {note.title.substring(0, 25)}...
          </h2>
          <p>{note.description.substring(0, 25)}...</p>
          <p>{note.coursecode}</p>
          <div style={{ display: "flex" }}>
            {stars} {/*displaying stars*/}
          </div>
        </div>
      </Link>
    </li>
  );
}
