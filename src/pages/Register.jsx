import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    major: "",
    yearOfStudy: "",
  });
  const { name, email, password, major, yearOfStudy } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }
  return (
    <section className="bg-sky-100">
      <h1 className="text-2xl text-center mt-6 font-semibold text-blue-900 select-none py-3">
        Create your account - Join us
      </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <p className="mt-1 text-blue-900 font-thin text-4xl font-mono select-none">
            Don't Just Take Notes, Share Them - Join the IUS CS/SE Collaborative
            Learning Experience
          </p>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mb-4 shadow-md overflow-hidden rounded-lg p-5 bg-white">
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <label
                className="block mb-2 font-semibold text-blue-800"
                htmlFor="email"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Full name"
                className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
              />
              <label
                className="block mb-2 font-semibold text-blue-800"
                htmlFor="email"
              >
                IUS Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
              />
            </div>
            <div className="mb-4 flex content-between">
              <div className="mr-4">
                <label
                  htmlFor="Major"
                  class="block mb-2 font-semibold text-blue-800"
                >
                  Major
                </label>
                <select
                  id="major"
                  value={formData.major}
                  onChange={onChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>-Major-</option>
                  <option>CS</option>
                  <option>SE</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="year"
                  class="block mb-2 font-semibold text-blue-800"
                >
                  Year
                </label>
                <select
                  id="yearOfStudy"
                  placeholder="-Year-"
                  value={formData.yearOfStudy}
                  onChange={onChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">-year-</option>
                  <option value="First-year">First-year</option>
                  <option value="Second-year">Second-year</option>
                  <option value="Third-year">Third-year</option>
                  <option value="Fourth-year">Fourth-year</option>
                </select>
              </div>
            </div>

            <div className="relative mb-6">
              <label
                className="block mb-2 font-semibold text-blue-800"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-2">
              <p>
                <Link
                  to="/log-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out text-sm"
                >
                  Sign in instead?
                </Link>
              </p>
            </div>

            <button
              className="w-full bg-blue-600 text-white px-7 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Register
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
