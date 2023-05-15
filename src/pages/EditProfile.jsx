import React, { useState, useRef, useEffect } from "react";
import { getAuth, updateEmail, updatePassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { Alert } from "@mui/material";

export default function  EditProfile() {

  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();
  const { currentUser} = getAuth();
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate() 
  
  // Update user data on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newPasswordRef.current.value !== newPasswordConfirmRef.current.value)
    {
      return setError('Passwords do not match') // perhaps toast?
    }

    const promises = [];
    setError('');
    setLoading(true);
    console.log(currentUser.email)
    console.log(emailRef.current.value)
    if(emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(currentUser, emailRef.current.value))
    }

    if(newPasswordRef.current.value){
      promises.push(updatePassword(currentUser, newPasswordRef.current.value));
    }

    Promise.all(promises).then(() => {
      setMessage('Account settings updated. Redirecting to your profile...');
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    })
    .catch(()=> {
      setError('Failed to update account');
    })
    .finally(() => {
      setLoading(false);
    })
    .catch((error) => {
      setError('Password incorrect');
    })
  };


  return (
    <div>
<Header/>
    <div className="p-4 max-w-md mx-auto">
      
  <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
  {message && <Alert variant="success">{message}</Alert>}
  {error && <Alert variant="danger">{error}</Alert>}
  <form onSubmit={handleSubmit} className="flex flex-col">
    <label className="mb-2">Email</label>
    <input type="email" defaultValue={currentUser.email} ref={emailRef} className="p-2 border rounded mb-4" />
    <label className="mb-2">Current Password</label>
    <input type="password" ref={currentPasswordRef} placeholder="Enter current password" required className="p-2 border rounded mb-4" />
    <label className="mb-2">New Password</label>
    <input type="password" ref={newPasswordRef} placeholder="Enter new password" className="p-2 border rounded mb-4" />
    <label className="mb-2">Confirm Password</label>
    <input type="password" ref={newPasswordConfirmRef} placeholder="Enter new password again"  className="p-2 border rounded mb-4" />
    <button type="submit"  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
  </form>
  <br />
  <Link to="/profile" className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-brown text-2xl">
          Cancel
        </Link>
</div>
</div>
  )
}
