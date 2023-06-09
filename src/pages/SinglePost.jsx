import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function SinglePost() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

  const handleRatingUpdate = (ratingValue) => {
    // Calculate new average rating
    const currentRating = note.rating || 0;
    const totalRatings = note.totalRatings || 0;
    const newTotalRatings = totalRatings + 1;
    const newAverageRating =
      (currentRating * totalRatings + ratingValue) / newTotalRatings;

    // Update rating in Firestore
    const docRef = doc(db, "listings", postId);
    updateDoc(docRef, {
      rating: newAverageRating,
      totalRatings: newTotalRatings,
    })
      .then(() => {
        console.log("Rating successfully updated in Firestore!");
        // Update the note object in the state
        setNote((prevNote) => ({
          ...prevNote,
          rating: newAverageRating,
          totalRatings: newTotalRatings,
        }));
      })
      .catch((error) => {
        console.error("Error updating rating in Firestore: ", error);
      });
  };

  return (
    <div className="flex flex-col">
      <Header />
      <>
        <section className="w-full justify-center items-center p-8 m-6 pl-6">
          <h1 className="text-4xl text-left font-semibold font-[Poppins] text-[#005696] mb-4">{note.title}</h1>
          <p className="text-1xl text-left font-semibold font-[Poppins] text-[#005696] mb-4">{note.description}</p>
          <div className="w-full h-max center bg-slate-50 border-slate-400">
            {note.noteUrls.map((noteUrl, index) => (
              <div key={index} className="self-center w-3/4 h-max border-2 border-slate-400 hover:border-slate-200">
                {noteUrl.endsWith(".pdf") ? (
                  <Viewer
                    fileUrl={noteUrl}
                    plugins={[
                      defaultLayoutPluginInstance,
                    ]}
                    defaultScale={SpecialZoomLevel.PageFit}
                  />
                ) : (
                  <img
                    src={noteUrl}
                    alt={`Note ${index + 1}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </div>
            ))}
          </div>
          <h1 className="text-2xl text-left font-semibold font-[Poppins] text-[#005696] my-4">Shared By: {note.username}</h1>
          <StarRating className="absolute right-0" rating={note.rating} onUpdateRating={handleRatingUpdate} />
        </section>
      </>
    </div>
  );
}
