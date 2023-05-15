import React from "react";
import Header from "../components/Header";
import PostView from "../components/PostView";
import StarRating from "../components/StarRating";



export default function CoursePage() {
  return (
    <>
      <Header />
    
      <div>Course page
      <div className="flex items-center justify-center "> 
      <h1> Course: Advanced Programming  </h1> 
      </div>

      <div className="flex items-center justify-center ">
        <h1> Course Code: CS105 </h1>
        </div>
        <div> <br></br></div></div>

           <div>
           
            <div className="flex items-row"><PostView /><StarRating /> <h1> Note name: Chapter 19: Nodes </h1></div>
            <div> <br></br></div>
            <div className="flex items-row"><PostView /> <StarRating /> <h1> Note name: Chapter 19: Nodes </h1></div>
            <div> <br></br></div>
            <div className="flex items-row"><PostView /><StarRating /> <h1> Note name: Chapter 19: Nodes </h1></div>
            <div> <br></br></div>
            <div className="flex items-row"><PostView /><StarRating /> <h1> Note name: Chapter 19: Nodes </h1></div>
            <div> <br></br></div>
            <div className="flex items-row"><PostView /><StarRating /> <h1> Note name: Chapter 19: Nodes </h1>  </div>

            
          </div>



    </>
  );
}
