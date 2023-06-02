import Header from "../components/Header";
import PostView from "../components/PostView";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import notfound from "../img/404-error.png";

export default function CoursePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { coursecode } = useParams();

  useEffect(() => {
    console.log("Course code:", coursecode);
    async function fetchNotes() {
      console.log("Fetching notes..."); // Log a message to indicate the fetchNotes function is executing
      const noteRef = collection(db, "listings");
      const q = query(
        noteRef,
        where("coursecode", "==", coursecode),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      console.log("Query snapshot:", querySnap); // Log the query snapshot object
      let notes = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      querySnap.forEach((doc) => {
        return notes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("Fetched note:", notes);

      setNotes(notes);
      setLoading(false);
    }
    fetchNotes();
  }, [coursecode]);

  return (
    <>
      <Header />

      <div>
        {!loading && notes.length > 0 && (
          <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5-">
            {notes.map((note, id) => (
              <PostView note={note} id={note.id} key={note.id} />
            ))}
          </ul>
        )}
        {!loading && notes.length === 0 && (
          <div className="fixed inset-0 bg-sky-100 flex items-center justify-center flex-col">
            <p className="font-mono text-3xl text-blue-900 font-thin max-w-screen-2xl">
              No notes found for the specified course code.
            </p>
            <img src={notfound} alt="error" className="mt-4 h-80" />
          </div>
        )}
      </div>
    </>
  );
}
