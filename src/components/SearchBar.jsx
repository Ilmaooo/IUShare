// import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
import {  collection, where, orderBy, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import defaultpic from "../img/open-book.png";
// import PostView from "../components/PostView";
// import { BsSearch } from "react-icons/bs";

// Rest of the code...



const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); 

 useEffect(() => {
    const handleSearch = async () => {
      try {
        // const {title} = query;
        const collectionRef = collection(db, 'listings');
        const q = query(collectionRef, where('title', '>=', searchQuery), orderBy('title'));
        const snapshot = await getDocs(q);

        const  results = snapshot.docs.map((doc) => doc.data());
        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error('Error searching Firestore:', error);
      }
    };

    if (searchQuery !== '') {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
 }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log("search query", searchQuery);
   console.log("Results", searchResults);
  };

  return (
    <div className="w-1/2 mx-auto mt-10 relative " >
     <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
             aria-hidden="true"
             className="w-5 h-5 text-gray-500 dark:text-gray-400"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
           type="search"
           id="default-search"
           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
           placeholder="Search for Notes...."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
           type="submit"
           className="text-white absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            search
        </button>
      </form>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
      {!loading && searchResults.length > 0 && (
          <>
      <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5-">
        {searchResults.map((result) => (
            <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]"
             key={result.id}> 
             <Link className="contents" to={`/category/${result.type}/${result.id}`}>
             <img
              className="h-[150px] w-[150] object-cover hover:scale-105 transition-scale duration-200 ease-in"
              loading="lazy"
              src={defaultpic}
              onError={defaultpic}
              alt="defaultpic"
             />
             <div className="p-4">
                <h2 className="text-xl font-bold text-[#005696]">{result.username}</h2>
                <h2 className="font-bold underline">{result.title}</h2>
                <p>{result.description}</p>
                <p>{result.courseName}</p>
             </div>
             </Link>
            </li>
        ))}
      </ul>
      </>
      )}
      </div>
    </div>
  );
};

export default SearchBar;
