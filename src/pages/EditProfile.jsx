import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../components/Header";

export default function  EditProfile() {

  const { currentUser } = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

const auth = getAuth();


  // Fetch user data on component mount
  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userData = await userRef.get();
      setName(userData.data().name);
      setEmail(userData.data().email);
      setMajor(userData.data().major);
      setYearOfStudy(userData.data().yearOfStudy);
      setPhotoUrl(userData.data().photoUrl);
    };
    getUserData();
  }, [currentUser.uid]);

  // Update user data on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userRef = firestore.collection("users").doc(currentUser.uid);
    const userRef = doc(db, "users", auth.currentUser?.uid);

    updateProfile(auth.currentUser, {
      name: name, 
      email: email,
      major: major,
      yearOfStudy: yearOfStudy,
    }).then(() => {
      console.log('Profile updated!');
    }).catch((error) => {
      console.log('There was an error updating profile');
    });

    // Update user password if it was changed
    if (password) {
      await currentUser.updatePassword(password);
    }

    // Update user profile photo if it was changed
    if (profilePhoto) {
      const storage = getStorage();
      // getting a reference to the picture
      const storageRef = ref(storage, `users/${currentUser.uid}/profilePhoto.jpg`);
      // const storageRef = storage.ref(`users/${currentUser.uid}/profilePhoto.jpg`);

      // uploading the photo
      uploadBytes(storageRef, profilePhoto).then((snapshot) => {
        console.log('Uploaded a photo!');
      });

      // getting the URL to store and tie to the user
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        updateProfile(auth.currentUser, {
          photoURL: photoUrl,
        }).then(() => {
          console.log('Profile picture updated!');
        }).catch((error) => {
          console.log('There was an error updating profile picture');
        });
      });
    }

    alert("User data updated successfully!");

  };

  // Handle profile photo upload
  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
<Header/>
    <div class="p-4 max-w-md mx-auto">
      
  <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
  <form onSubmit={handleSubmit} class="flex flex-col">
    <label class="mb-2">Name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="p-2 border rounded mb-4" />
    <label class="mb-2">Email</label>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="p-2 border rounded mb-4" />
    <label class="mb-2">Password</label>
    <input type="password" onChange={(e) => setPassword(e.target.value)} class="p-2 border rounded mb-4" />
    <label class="mb-2">Major</label>
    <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} class="p-2 border rounded mb-4" />
    <label class="mb-2">Year of Study</label>
    <input type="text" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} class="p-2 border rounded mb-4" />
    <label class="mb-2">Profile Photo</label>
    <input type="file" accept="image/*" onChange={handlePhotoChange} class="mb-4" />
    {photoUrl && <img src={photoUrl} alt="profile" class="mb-4" />}
    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
  </form>
</div>
</div>
  )
}
