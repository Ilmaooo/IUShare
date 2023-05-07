import React from "react";
import pic from "../img/profile-pic.jpg";

function UserInfo() {
  return (
    <div className="user_info">
      {" "}
      {/* basic user information: Name; Academic; Photo */}
      <h3 className="absolute top-24 right-48 text-brown text-2xl">
        Anna Woods
      </h3>
      <h3 className="absolute top-32 right-48  text-brown text-2xl">
        Computer Science | Third year
      </h3>
      <img
        src={pic}
        alt="pic"
        className="md:cursor-pointer h-24 absolute top-20 right-20 w-24 rounded-full"
      />
    </div>
  );
}

export default UserInfo;
