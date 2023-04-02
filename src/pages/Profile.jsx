import React from "react";
import UserInfo from "../components/UserInfo";
import PostView from "../components/PostView";
export default function Profile() {

  return (
    
  <div>
    <UserInfo/>
  <br />
  <br />
  <br />
  <br />
  
  <h3 className="absolute top-48 left-24 text-brown text-2xl">Saved Notes</h3>
  <h3 className="absolute top-48 right-24 text-brown text-2xl">My Notes</h3>
    <br />
    <br />
    <br />
    <div className="grid grid-cols-2 grid-rows-1">
    <div className="flex items-center justify-center">
  <div className="grid grid-cols-2 gap-6">
  <PostView/>
    <PostView/>
    <PostView/>
    <PostView/>
  
  </div>
</div>
<div className="flex items-center justify-center">
  <div className="grid grid-cols-2 gap-6">
  <PostView/>
    <PostView/>
    <PostView/>
    <PostView/>
    
  </div>
</div>

    </div>
    
    </div>
 

  );

}
