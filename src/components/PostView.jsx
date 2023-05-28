import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import defaultpic from "../img/open-book.png";
//import post from "../img/post-view.png";

/*
A single Post View that is used as a component in Profile page. 

*/

export default function PostView({ note, id }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px] ">
      <Link className="contents" to={`/category/${note.type}/${id}`}>
        <img
          className="h-[150px] w-[150] object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={defaultpic}
          onError={defaultpic}
          alt="defaultpic"
        />

        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {note.timestamp?.toDate()}
        </Moment>
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#005696]">{note.username}</h2>
          <h2 className="font-bold underline">{note.title}</h2>
          <p>{note.description}</p>
          <p>{note.courseName}</p>
        </div>
      </Link>
    </li>
  );
}
