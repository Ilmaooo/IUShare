import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import defaultpic from "../img/open-book.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import StarRating, { handleRatingUpdate } from "./StarRating";

export default function PostView({ note, id }) {
  // Check if the note has any URLs
  const hasUrls = note.noteUrls && note.noteUrls.length > 0;

  // Get the first URL from the note's URLs
  const firstUrl = hasUrls ? note.noteUrls[0] : null;

  // Determine if the first URL is a PDF
  const isPdf = hasUrls && firstUrl.toLowerCase().includes(".pdf");

  // Render the image or PDF accordingly
  const renderMedia = () => {
    if (isPdf) {
      // Render the first page of the PDF
      return (
        <div className='h-[150px] w-[150px] object-cover hover:scale-105 transition-scale duration-200 ease-in select-none'>
          <object data={firstUrl} type='application/pdf'>
            {/* <img src={defaultpic} alt="defaultpic" /> */}
          </object>
        </div>
      );
    } else if (hasUrls) {
      // Render the first image
      return (
        <img
          className='h-[150px] w-[150px] object-cover hover:scale-105 transition-scale duration-200 ease-in'
          loading='lazy'
          src={firstUrl}
          alt='note-image'
        />
      );
    } else {
      // Render the default image
      return (
        <img
          className='h-[150px] w-[150px] object-cover hover:scale-105 transition-scale duration-200 ease-in'
          loading='lazy'
          src={defaultpic}
          alt='defaultpic'
        />
      );
    }
  };

  return (
    <li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] '>
      <Link className='contents' to={`/category/${note.coursecode}/${id}`}>
        {renderMedia()}

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
            <StarRating
              rating={note.rating}
              onUpdateRating={handleRatingUpdate}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
