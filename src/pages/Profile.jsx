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
      <section>
        <Header />
        <UserInfo />
        <Link
          to="/edit-profile"
          className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute top-20 left-60 text-brown text-2xl"
        >
          Edit Profile
        </Link>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && notes.length > 0 && (
          <>
            <h2
              className="text-4xl text-center font-semibold
          font-[Poppins] text-[#005696] mb-10"
            >
              My Notes
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5-">
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
