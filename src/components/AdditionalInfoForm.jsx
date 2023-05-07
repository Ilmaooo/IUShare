import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdditionalInfoForm = ({ onComplete }) => {
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [major, setMajor] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.id === "major") {
      setMajor(e.target.value);
    } else if (e.target.id === "yearOfStudy") {
      setYearOfStudy(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      await updateProfile(user, {
        additionalInfo: {
          yearOfStudy,
          major,
        },
      });

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          yearOfStudy,
          major,
        },
        { merge: true }
      );

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex content-center">
        <div className="mr-4">
          <label htmlFor="Major" class="block mb-2 font-semibold text-blue-800">
            Major
          </label>
          <select
            id="major"
            value={major}
            onChange={onChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>-Major-</option>
            <option>CS</option>
            <option>SE</option>
          </select>
        </div>
        <div>
          <label htmlFor="year" class="block mb-2 font-semibold text-blue-800">
            Year
          </label>
          <select
            id="yearOfStudy"
            placeholder="-Year-"
            value={yearOfStudy}
            onChange={onChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">-year-</option>
            <option value="First-year">First-year</option>
            <option value="Second-year">Second-year</option>
            <option value="Third-year">Third-year</option>
            <option value="Fourth-year">Fourth-year</option>
          </select>
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white px-7 py-2 text-sm w-52  font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AdditionalInfoForm;
