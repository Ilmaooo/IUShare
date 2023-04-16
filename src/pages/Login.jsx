import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-7xl max-h-max">
        <div className="float-left inset-y-0 left-0 p-4 text-center">
          <h1 className="text-2xl font-semibold text-blue-900">
            Welcome back to IUShare
          </h1>
          <p className="mt-1 text-sky-600">
            Don't Just Take Notes, Share Them - Join the IUS CS/SE Collaborative
            Learning Experience
          </p>
        </div>
        <div className="float-right inset-y-0 right-0 px-6 py-8">
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 font-semibold text-blue-800"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                type="email"
                id="email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-semibold text-blue-800"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 border rounded-lg text-blue-800 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-3 mr-3"
                  onClick={togglePassword}
                >
                  <i
                    className={`far ${
                      passwordShown ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            New to IUShare?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
