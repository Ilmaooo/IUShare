import React from "react";
import UserInfo from "../components/UserInfo";
import PostView from "../components/PostView";
import Header from "../components/Header";
import { Link } from 'react-router-dom';


export default function Profile() {
  return (
    <div>
      <Header />
      <UserInfo />
    
      
      
      <br />
      <br />
      <Link to="/edit-profile" className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute top-25 left-24 text-brown text-2xl">
          Edit Profile
        </Link>

      <h3 className="absolute top-48 left-24 text-brown text-2xl">
        Saved Notes
      </h3>
      <h3 className="absolute top-48 right-24 text-brown text-2xl">My Notes</h3>
      <br />
      <br />
      <br />
      <div className="grid grid-cols-2 grid-rows-1 gap-x-0 px-10">
        <div className="flex items-center justify-center ">
          <div className="pr-1 grid grid-cols-2 gap-3 h-96 overflow-y-scroll scroll-auto">
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
            <PostView />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="pr-1 grid grid-cols-2 gap-3  h-96 overflow-y-scroll scroll-auto">
            <PostView />
            <PostView />
            <PostView />
            <PostView />
          </div>
        </div>
      </div>
    </div>
  );
}
