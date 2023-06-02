import { useParams } from "react-router";
import Header from "../components/Header";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
import StarRating from "../components/StarRating";

export default function SinglePost() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { coursecode, postId, userId } = useParams();

  useEffect(() => {
    async function fetchNote() {
      try {
        const docRef = doc(db, "listings", postId);
        console.log("Post ID:", postId);
        const docSnap = await getDoc(docRef);
        console.log("Document Snapshot:", docSnap);
        if (docSnap.exists()) {
          const postData = docSnap.data();
          console.log("Post Data:", postData);
          if (docSnap.id === postId) {
            setNote(postData);
          }
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        toast.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [postId]);

  if (loading) {
    return <Spinner />;
  }
  if (!note) {
    return <div>Post not found</div>;
  }
  return (
    <>
      <section>
        <Header />
        <h1>{note.title}</h1>
        <h1>{note.username}</h1>
        <StarRating />
      </section>
    </>
  );
}
