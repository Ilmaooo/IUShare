import Header from "../components/Header";
import PostView from "../components/PostView";
import StarRating from "../components/StarRating";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import defaultpic from "../img/open-book.png";
import { Link } from "react-router-dom";


export default function CoursePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { coursecode } = useParams();

  useEffect(() => {
    console.log("Course code:", coursecode);
    async function fetchNotes() {
      console.log("Fetching notes..."); // Log a message to indicate the fetchNotes function is executing
      const noteRef = collection(db,  "listings");
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
            {notes.map((note, index) => (
                <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]"
                key={index}> 
                <Link className="contents" to={`/category/${note.type}/${index}`}>
                <img
                 className="h-[150px] w-[150] object-cover hover:scale-105 transition-scale duration-200 ease-in"
                 loading="lazy"
                 src={defaultpic}
                 alt="defaultpic"
                />
                <div className="p-4">
                   <h2 className="text-xl font-bold text-[#005696]">{note.username}</h2>
                   <h2 className="font-bold underline">{note.title}</h2>
                   <p>{note.description}</p>
                   <p>{note.courseName}</p>
                </div>
                </Link>
               </li>
            ))}
          </ul>
        ) }
          {!loading && notes.length === 0 && (
          <p>No notes found for the specified course code.</p>
        )}
      </div>
    </>
  );
}
