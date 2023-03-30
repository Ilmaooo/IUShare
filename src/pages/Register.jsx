import React, { useState } from "react";

export default function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    let inputError = {
      nmae: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return;
    }

    if (!formInput.email) {
      // how to validate the email
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return;
    }

    if (formInput.confirmPassword !== formInput.password) {
      // need to use it but not sure how
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return;
    }

    setFormError(inputError);
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md w-full">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create your Account , JOIN US
          </h1>
        </div>
        <div className="px-6 py-8">
          <form onSubmit={validateFormInput}>
            <div className="mb-4">
              <label
                className="block mb-2 font-semibold text-gray-800"
                htmlFor="text"
              >
                Full Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                value={formInput.name}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="name"
                type="text"
                id="name"
                placeholder="First, last name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-semibold text-gray-800"
                htmlFor="email"
              >
                IUS Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                name="email"
                type="email"
                id="email"
                placeholder="id@flowbite.edu.ba"
                required
              />
            </div>
            <div className="mb-4 flex px-2 content-between">
              <div className="mr-4">
                <label
                  for="Major"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Major
                </label>
                <select
                  id="Major"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>-Major-</option>
                  <option>CS</option>
                  <option>SE</option>
                </select>
              </div>
              <div>
                <label
                  for="Year"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <select
                  id="Year"
                  placeholder="-Year-"
                  class="bg-grey-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>-year-</option>
                  <option>First-year</option>
                  <option>Second-year</option>
                  <option>Third-year</option>
                  <option>Four-year</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label
                for="password"
                className="block mb-2 font-semibold text-gray-800"
                htmlFor="password"
              >
                Your Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
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
            <div className="mb-4">
              <label
                for="repeat-password"
                className="block mb-2 font-semibold text-gray-800"
                htmlFor="password"
              >
                Repeat Password
              </label>
              <div className="relative">
                <input
                  name="repeatpassword"
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 pr-10"
                  type={passwordShown ? "text" : "password"}
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
            <div className="place-self-auto mb-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
