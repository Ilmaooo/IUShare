import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }
  return (
    <section className="bg-sky-100">
      <h1 className="text-2xl text-center mt-6 font-semibold text-blue-900 select-none">
        Forgot Password
      </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <p className="mt-1 text-blue-900 font-thin text-4xl font-mono select-none">
            Don't Just Take Notes, Share Them - Join the IUS CS/SE Collaborative
            Learning Experience
          </p>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mb-4 shadow-md overflow-hidden rounded-lg p-5 bg-white">
          <form>
            <label
              className="block mb-2 font-semibold text-blue-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6  text-sm text-gray-600">
                New to IUShare?
                <Link
                  to="/register"
                  className="text-blue-700 hover:text-blue-900 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/log-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out text-sm"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send reset password
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
