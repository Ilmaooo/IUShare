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
    
    <div className="border border-gray-300 rounded-lg p-4 absolute top-32 right-12">
      <div className="text-blue-800 text-xl font-playfair-display tracking-wide mr-3 mb-2 text-right">
        <h3 className="transition-colors duration-300 hover:text-blue-900">{userData.name}</h3>
        <h3 className="transition-colors duration-300 hover:text-blue-900">{userData.major}</h3>
        <h3 className="transition-colors duration-300 hover:text-blue-900">{userData.yearOfStudy}</h3>
      </div>
      <hr className="border-t-2 border-gray-300 mt-4 mx-auto w-16" />
    </div>
  );
}

export default UserInfo;
