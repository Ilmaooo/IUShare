import React, { useState } from "react";
import Header from "../components/Header";

export default function ShareNotes() {
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

  async function onSubmit(e) {}

  return (
    <main className="bg-sky-100 bg-local bg-cover max-h-fit">
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
