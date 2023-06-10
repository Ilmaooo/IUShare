import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import StarRating, { handleRatingUpdate } from "../components/StarRating";
import { Document, Page, pdfjs } from "react-pdf";
import { Carousel } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePost() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  function onDocumentSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
    <div className='flex flex-col'>
      <Header />
      <>
        <section className='w-full justify-center items-center p-8 m-6 pl-6'>
          <h1 className='text-4xl text-left font-semibold font-[Poppins] text-[#005696] mb-4'>
            {note.title}
          </h1>
          <p className='text-1xl text-left font-semibold font-[Poppins] text-[#005696] mb-4'>
            {note.description}
          </p>
          <div className='w-3/4 h-max'>
            <Carousel className=' center border-slate-400' autoplay>
              {note.noteUrls.map((noteUrl, index) => (
                <div
                  key={index}
                  className='self-center w-3/4 border-2 border-slate-400 hover:border-slate-200 h-96 overflow-auto'
                >
                  {noteUrl.includes(".pdf") ? (
                    <div className='h-96 overflow-auto'>
                      <Document
                        file={noteUrl}
                        onLoadSuccess={onDocumentSuccess}
                        //options={{ workerSrc: "/pdf.worker.js" }}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page key={index + 1} pageNumber={index + 1} />
                        ))}
                      </Document>
                    </div>
                  ) : (
                    <img
                      src={noteUrl}
                      alt={`Note ${index + 1}`}
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <h1 className='text-2xl text-left font-semibold font-[Poppins] text-[#005696] my-4'>
            Shared By: {note.username}
          </h1>
          <h1 className='text-xl text-left font-semibold font-[Poppins] text-[#005696] my-4'>
            Course code: {note.coursecode.toUpperCase()}
          </h1>
          <StarRating
            className='absolute right-0'
            rating={note.rating}
            onUpdateRating={(ratingValue) =>
              handleRatingUpdate(note, setNote, postId, ratingValue)
            }
          />
        </section>
      </>
    </div>
  );
}
