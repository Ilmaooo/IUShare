import React from "react";
import PostView from "../components/PostView";

function Notes(props) {
return(
    <div className="container m-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4"> {/* basic user information: Name; Academic; Photo */}
        <PostView/>
        <PostView/>
        <PostView/>
        <PostView/>
    </div>
)
}

export default Notes;