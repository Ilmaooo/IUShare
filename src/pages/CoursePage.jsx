import Header from "../components/Header";
import PostView from "../components/PostView";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { Result } from "antd";

export default function CoursePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { coursecode } = useParams();

  useEffect(() => {
    console.log("Course code:", coursecode);
    async function fetchNotes() {
      setLoading(true);
      setNotes([]); //Clears the notes state to avoid seeing "No notes found" message for a millisecond before displaying new notes
      console.log("Fetching notes..."); // Log a message to indicate the fetchNotes function is executing
      const noteRef = collection(db, "listings");
      const q = query(
        noteRef,
        where("coursecode", "==", coursecode.toUpperCase()),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      console.log("Query snapshot:", querySnap); // Log the query snapshot object
      let notes = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // querySnap.forEach((doc) => {
      //   return notes.push({
      //     id: doc.id,
      //     ...doc.data(),
      //   });
      // });
      console.log("Fetched note:", notes);

      setNotes(notes);
      setLoading(false);
    }
    fetchNotes();
  }, [coursecode]);

  return (
    <section>
      <Header />

      <div>
        <h1 className="transition-colors duration-300 hover:text-blue-500 text-3xl text-center  font-playfair-display text-sky-600 mb-10 select-none cursor-pointer py-8 ">
          Unleash Your Potential in {coursecode.toUpperCase()}
        </h1>
        {!loading && notes.length > 0 && (
          <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5-">
            {notes.map((note, id) => (
              <PostView note={note} id={note.id} key={note.id} />
            ))}
          </ul>
        )}
        {!loading && notes.length === 0 && (
          <Result
            status="404"
            title="404"
            subTitle="No notes found for the specified course."
          />
        )}
      </div>
    </section>
  );
}
