import pic from "../img/profile-pic.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function getCurrentUserId() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    return currentUser.uid;
  }

  return null;
}

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getCurrentUserId();
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            setUserData(user);
          }
        }
        const storage = getStorage();
      // getting a reference to the picture
        const storageRef = ref(storage, `users/${userId}/profilePhoto.jpg`);
        setUserPhoto(getDownloadURL(storageRef));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };


    fetchUserData();
    
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <div className="flex justify-end mr-5">
      <div className="font-semibold text-blue-800 text-xl font-[Poppins]tracking-wide mr-3 mt-2 text-right">
        <h3>{userData.name}</h3>
        <h3>{userData.major}</h3>
        <h3>{userData.yearOfStudy}</h3>
        
        
        
      </div>
      <img
        src={userPhoto}
        alt="pic"
        className="md:cursor-pointer h-24 mr-2 rounded-full top-20 right-20 w-24 my-2"
      />
      
    </div>
  );
}

export default UserInfo;
