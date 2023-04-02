import React from "react";
import post from "../img/post-view.png";

/*
A single Post View that is used as a component in Profile page. 
Right now it is just a picture.
*/

function PostView() {
return(
    <div className="post"> {/* TODO: add actual info, for now gray placeholder */}
       <img src={post} alt="post" className="something"  />
    </div>
)
}

export default PostView;