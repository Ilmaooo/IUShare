import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { VscCloudUpload } from "react-icons/vsc";

export default function ShareNotes() {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    username: "",
    notes: [],
    coursecode: "",
    rating: 0,
    ratedBy: [],
  });

  const { title, description, username, notes, coursecode, rating } = formData;

  if (currentUser) {
    formData.username = currentUser.displayName || currentUser.email;
  }

  const [uploadedFiles, setUploadedFiles] = useState([]);

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
    console.log("Current user name: ", auth.currentUser.name);

    // Verify User UID
    if (auth.currentUser) {
      const currentUserUID = auth.currentUser.uid;
      console.log("Current User UID:", currentUserUID);
    }

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
      coursecode: formData.coursecode,
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
    navigate(`/category/${formDataCopy.coursecode}/${docRef.id}`);
  }

  return (
    <main>
      <Header />
      {loading && <Spinner className='bg-opacity-25' />}
      <div className='max-w-md px-4 mx-auto font-serif '>
        <h1 className='text-2xl text-center mt-6 font-semibold text-blue-900 select-none py-3'>
          Share a Note
        </h1>
        <form className='space-x-4' onSubmit={onSubmit}>
          <div className='absolute left-0 px-4 mx-8 w-1/2 mr-4 ml-16'>
            <div className='mb-3 w-3/4 ml-6'>
              <label
                htmlFor='username'
                className='block mb-1 font-semibold text-blue-500 '
              >
                User Name
              </label>
              <input
                type='text'
                id='username'
                value={formData.username}
                placeholder='Name'
                maxLength='32'
                required
                className='w-full h-10 px-4 py-2 text-xl text-gray-700  bg-blue-100 border-gray-300 rounded  focus:outline-none focus:border-sky-600 mb-2'
                readOnly
              />
            </div>

            <div className='mb-1 w-3/4 ml-6'>
              <label
                htmlFor='title'
                className='block mb-1 font-semibold text-blue-500'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={onChange}
                placeholder='Title'
                maxLength='32'
                required
                className='w-full h-10 px-4 py-2 text-xl text-gray-700  bg-blue-100 border-gray-300 rounded focus:outline-none focus:border-sky-600  focus:bg-slate-200 mb-2'
              />
            </div>

            <div className='mb-1 w-3/4 ml-6'>
              <label
                htmlFor='description'
                className='block mb-1 font-semibold text-blue-500'
              >
                Description
              </label>
              <textarea
                type='text'
                id='description'
                value={description}
                onChange={onChange}
                placeholder='Description'
                required
                className='w-full h-14 px-4 py-2 text-xl text-gray-700  bg-blue-100 border-gray-300 rounded focus:outline-none focus:bg-slate-200 focus:border-sky-600 mb-2'
              />
            </div>

            <div className='mb-1 w-3/4 ml-6'>
              <label
                htmlFor='coursecode'
                className='block mb-2 font-semibold text-blue-500'
              >
                Course Code
              </label>

              <select
                id='coursecode'
                value={coursecode}
                onChange={onChange}
                required
                className='w-full h-10  px-4 py-2 text-xl text-gray-700  bg-blue-100 rounded-lg  border-gray-300  focus:outline-none focus:bg-slate-200 focus:border-sky-600 mb-3 appearance-none origin-top '
              >
                <option value='' disabled>
                  Choose a course code
                </option>
                <option>CS103</option>
                <option>CS105</option>
                <option>CS302</option>
                <option>CS303</option>
                <option>CS304</option>
                <option>CS305</option>
                <option>CS306</option>
                <option>CS307</option>
                <option>CS308</option>
                <option>CS313</option>
                <option>CS412</option>
                <option>ENS101</option>
                <option>ENS203</option>
                <option>ENS309</option>
                <option>ENS490</option>
                <option>EE325</option>
                <option>IE408</option>
                <option>NS102</option>
                <option>MATH101</option>
                <option>MATH102</option>
                <option>MATH201</option>
                <option>MATH202</option>
                <option>MATH203</option>
                <option>MATH204</option>
                <option>MATH205</option>
                <option>SE308</option>
              </select>
            </div>
          </div>
          <div className='absolute right-0 px-8 py-4 mx-8 my-4 w-1/2 justify-center  ml-4'>
            <div className=' px-8 py-4 place-items-center flex flex-col justify-center items-center w-full h-64 bg-stone-100 border-2 border-dashed border-slate-400 hover:border-indigo-300 rounded-xl mb-6 '>
              <label
                htmlFor='notes'
                className='block font-semibold text-blue-800'
              >
                Upload you Notes
              </label>
              <p className='text-gray-600'>
                The first image will be the cover (max 6)
              </p>
              <VscCloudUpload className='text-4xl' />
              <div className='flex items-center justify-center'>
                <input
                  type='file'
                  id='notes'
                  onChange={onChange}
                  accept='.jpg,.png,.jpeg,.pdf'
                  multiple
                  required
                  className='w-full h-full opacity-0 cursor-pointer'
                  placeholder=' Upload you Notes '
                />
              </div>
              <div className=''>
                {notes.length > 0 && (
                  <span className='ml-2 text-green-600'>
                    Files uploaded successfully! , number of files uploaded{" "}
                    {notes.length}, {notes.type}
                  </span>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='bottom-0  w-full my-2 px-8 py-3 bg-blue-400 text-white font-medium text-m uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out'
            >
              Share Note
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
