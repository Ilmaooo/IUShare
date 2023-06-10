import React, { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import PostView from "../components/PostView";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    async function fetchUserNotes() {
      const noteRef = collection(db, "listings");
      const q = query(
        noteRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let notes = [];
      querySnap.forEach((doc) => {
        return notes.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setNotes(notes);
      setLoading(false);
    }
    fetchUserNotes();
  }, [auth.currentUser]);
  return (
    <>
      <Header />
      <section>
        <UserInfo />
        <Link
          to="/edit-profile"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full block mt-4 mx-auto w-40 text-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 absolute top-72 right-14 transform -translate-y-1/2 shadow-md transition-all duration-300 hover:scale-105 font-[Poppins]"
        >
          Edit Profile
        </Link>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="max-w-6xl px-3 mt-6 mx-auto ">
        {!loading && notes.length > 0 && (
          <>
            {/* <h2
              className="transition-colors duration-300 hover:text-blue-500 text-4xl text-center font-semibold
              font-[Poppins] text-[#005696] mb-10"
            >
              My Notes

            </h2> */}
            <h2 className="transition-colors duration-300 hover:text-blue-500 text-3xl text-center  font-playfair-display text-blue-900 mb-10 select-none cursor-pointer">
              My Notes
            </h2>

            <hr className="border-t-2 border-gray-300 mx-auto w-16" />
            <br />
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {notes.map((note) => (
                <PostView key={note.id} id={note.id} note={note.data} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
