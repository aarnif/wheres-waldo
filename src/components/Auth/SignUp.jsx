import signingService from "../../services/signingService";
import useField from "../../hooks/useField";

import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const userName = useField("text", "Enter username here...");
  const password = useField("password", "Enter password here...");
  const confirmPassword = useField("password", "Enter password here again...");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userName.value.length === 0 || password.value.length === 0) {
      setErrorMessage("Please enter username and password!");
      return;
    }

    console.log("Signing up...");

    const newUser = {
      username: userName.value,
      password: password.value,
    };

    signingService
      .createUser(newUser)
      .then((response) => {
        console.log(response);
        signingService
          .logIn({
            username: userName.value,
            password: password.value,
          })
          .then((user) => {
            console.log("Logged in:", user);
            signingService.setToken(user.token);
            setUser(user);
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(error.response.data.error);
      });
  };

  const handleFormChange = (event) => {
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    if (userName.value.length < 4) {
      setErrorMessage("Username must be at least 4 characters long!");
    } else if (password.value.length > 0 && password.value.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
    } else if (
      confirmPassword.value.length > 0 &&
      password.value !== confirmPassword.value
    ) {
      setErrorMessage("Passwords do not match!");
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex-grow flex flex-col justify-center items-center">
        <div
          className="flex-grow max-w-[600px] min-w-[420px] max-h-[500px] p-8 flex justify-center items-center
          bg-zinc-700 bg-opacity-70 rounded-xl text-white shadow-xl"
        >
          <form
            id="sign-up-form"
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            className="flex-grow h-full flex flex-col"
          >
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <ul>
              {errorMessage && (
                <li className="p-2 flex justify-center items-center bg-red-400 rounded-lg">
                  <span className="text-md text-red-700">{errorMessage}</span>
                </li>
              )}

              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-slate-200">
                  USERNAME:
                </label>
                <input
                  id="username"
                  name="username"
                  className="w-full flex-grow p-2 rounded-lg bg-zinc-500
          focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-200 transition"
                  {...userName}
                />
                {userName.value.length === 0 && (
                  <span className="text-sm text-red-500">
                    Please enter username of at least 4 characters
                  </span>
                )}
              </li>

              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-slate-200">
                  PASSWORD:
                </label>
                <input
                  id="password"
                  name="password"
                  className="w-full flex-grow p-2 rounded-lg bg-zinc-500
          focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-200 transition"
                  {...password}
                />
                {password.value.length === 0 && (
                  <span className="text-sm text-red-500">
                    Please enter password of at least 6 characters
                  </span>
                )}
              </li>

              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-slate-200">
                  CONFIRM PASSWORD:
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  className="w-full flex-grow p-2 rounded-lg bg-zinc-500
          focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-200 transition"
                  {...confirmPassword}
                />
                {confirmPassword.value.length === 0 && (
                  <span className="text-sm text-red-500">
                    Please re-enter password
                  </span>
                )}
              </li>

              <li className="my-4 flex justify-center items-center">
                <button
                  type="submit"
                  className="flex-grow h-[70px] bg-green-500 border border-green-500 rounded-xl text-xl font-bold text-white
                hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95 transition"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
