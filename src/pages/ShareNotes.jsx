import { useState } from "react";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";

export default function ShareNotes() {
  // const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    notes: [],
    coursecode: "",
  });
  const { title, username, notes, coursecode } = formData;

  function onChange(e) {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        notes: Array.from(e.target.files),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (notes.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 notes are allowed");
      return;
    }

    const auth = getAuth();
console.log("Current User:", auth.currentUser);

// Verify User UID
if (auth.currentUser) {
  const currentUserUID = auth.currentUser.uid;
  console.log("Current User UID:", currentUserUID);}

    async function storeNote(note) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${note.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, note);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                return;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const noteUrls = await Promise.all(
      [...notes].map((note) => storeNote(note))
    ).catch((error) => {
      console.log(error);
      setLoading(false);
      toast.error("Notes not uploaded");
      return;
    });
    // Check if noteUrls is undefined or has any undefined values
    if (!noteUrls || noteUrls.some((url) => url === undefined)) {
      setLoading(false);
      toast.error("Invalid note URLs");
      return;
    }
    console.log("noteURLS");
    console.log(noteUrls);

    const formDataCopy = {
      ...formData,
      noteUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.notes;
    console.log("data Form Copy");
    console.log(formDataCopy);
    setLoading(false);
    console.log("docRef block start");

    const docRef = doc(collection(db, "listings"));
    await setDoc(docRef, formDataCopy);

    console.log("success");

    toast.success("Note created");
    //navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main >
      <Header />
      <div className="max-w-md px-2 mx-auto">
        <h1 className="text-2xl text-center mt-6 font-semibold text-blue-900 select-none py-3">
          Share a Note
        </h1>
        <form onSubmit={onSubmit}>
          <p className="block mb-2 font-semibold text-blue-800">Title</p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
            maxLength="32"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-sky-100 focus:border-sky-600 mb-3"
          />

          <p className="block mb-2 font-semibold text-blue-800">User Name</p>
          <input
            type="text"
            id="username"
            value={username}
            onChange={onChange}
            placeholder="Name"
            maxLength="32"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-sky-100 focus:border-sky-600 mb-3"
          />

          <p className="block mb-2 font-semibold text-blue-800">Course Code</p>
          <input
            type="text"
            id="coursecode"
            value={coursecode}
            onChange={onChange}
            placeholder="Course code (ex. SE308)"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-sky-100 focus:border-sky-600 mb-3"
          />

          <div className="mb-6">
            <p className="block mb-2 font-semibold text-blue-800">Notes</p>
            <p className="text-gray-600">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="notes"
              onChange={onChange}
              accept=".jpg,.png,.jpeg,.pdf"
              multiple
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-sky-100 focus:border-sky-600 mb-3"
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-sky-600 text-white font-medium text-m uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Share
          </button>
        </form>
      </div>
    </main>
  );
}
