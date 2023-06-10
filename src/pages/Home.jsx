import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "firebase/compat/firestore";
import SearchBar from "../components/SearchBar";
import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import PostView from "../components/PostView";
import { FcRating } from "react-icons/fc";
import { StarTwoTone } from "@ant-design/icons";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [topNotes, settopNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const noteRef = collection(db, "listings");
        const q1 = query(
          noteRef,
          where("userRef", "!=", auth.currentUser.uid),
          orderBy("userRef"),
          orderBy("timestamp", "desc")
        );
        const q2 = query(
          noteRef,
          where("rating", ">", 3),
          orderBy("rating", "desc")
        );
        const querySnap1 = await getDocs(q1);
        const notesData = querySnap1.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        const querySnap2 = await getDocs(q2);
        const topnotesData = querySnap2.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setNotes(notesData);
        settopNotes(topnotesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    if (auth.currentUser) {
      fetchNotes();
    }
  }, [auth.currentUser]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col">
      <Header />

      <div className="justify-self-end float-right inset-y-0 right-0 px-6 py-8 bg-gradient-to-r from-blue-200 to-violet-200">
        <div className=" grid justify-items-center">
          <h2 className="text-3xl text-center font-semibold font-[Poppins] text-[#005696] mb-10">
            Embark on a journey of knowledge and share the brilliance of your
            notes with others.
          </h2>
          <button className="w-64 bg-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 px-4 pr-2 rounded-xl ">
            <Link to="/share-notes">Share Note</Link>
          </button>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-6xl px-3 mt-6 mx-auto mb-6">
        {!loading && topNotes.length > 0 ? (
          <>
            <fieldset class="border-t border-slate-400 mt-14">
              <legend class="mx-auto px-4 font-[Poppins] text-[#005696] mb-10 text-4xl italic">
                Top Rated Notes
              </legend>
            </fieldset>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {topNotes.map((note) => (
                <PostView key={note.id} id={note.id} note={note.data} />
              ))}
            </ul>
          </>
        ) : (
          <p>No notes found.</p>
        )}
      </div>

      <hr className="m-4 " />

      <div className="max-w-6xl px-3 mt-6 mx-auto mb-6">
        {!loading && notes.length > 0 ? (
          <>
            <fieldset class="border-t border-slate-400 mt-14">
              <legend class="mx-auto px-4 font-[Poppins] text-[#005696] mb-10 text-4xl italic">
                Some Notes
              </legend>
            </fieldset>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {notes.map((note) => (
                <PostView key={note.id} id={note.id} note={note.data} />
              ))}
            </ul>
          </>
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
}
