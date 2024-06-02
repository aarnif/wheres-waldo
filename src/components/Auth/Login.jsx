import signingService from "../../services/signingService";
import useField from "../../hooks/useField";

import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const userName = useField("text", "Enter your username here...");
  const password = useField("password", "Enter your password here...");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleDisplayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userName.value.length === 0 || password.value.length === 0) {
      handleDisplayErrorMessage("Please enter your username and password!");
      return;
    }

    console.log("Logging in...");
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
      })
      .catch((error) => {
        console.error("Error:", error);
        handleDisplayErrorMessage(error.response.data.error);
      });

    event.target.reset();
  };

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <Header />
      <div className="w-full flex-grow flex flex-col justify-center items-center bg-zinc-600">
        <div
          className="flex-grow max-w-[600px] min-w-[420px] max-h-[500px] p-8 flex justify-center items-center
         bg-zinc-100 bg-opacity-50 rounded-xl"
        >
          <form
            onSubmit={handleSubmit}
            className="flex-grow h-full flex flex-col"
          >
            <h1 className="text-2xl font-bold text-zinc-800">Sign In</h1>
            <ul>
              {errorMessage && (
                <li className="p-2 flex justify-center items-center bg-red-400 rounded-lg">
                  <span className="text-md text-red-700">{errorMessage}</span>
                </li>
              )}

              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-zinc-700">
                  USERNAME:
                </label>
                <input
                  className="w-full flex-grow p-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-zinc-500 transition"
                  {...userName}
                />
                {userName.value.length === 0 && (
                  <span className="text-sm text-red-500">
                    Please enter your username
                  </span>
                )}
              </li>

              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-zinc-700">
                  PASSWORD:
                </label>
                <input
                  className="w-full flex-grow p-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-zinc-500 transition"
                  {...password}
                />
                {password.value.length === 0 && (
                  <span className="text-sm text-red-500">
                    Please enter your password
                  </span>
                )}
              </li>

              <li className="my-4 flex justify-center items-center">
                <button
                  type="submit"
                  className="flex-grow h-[70px] bg-green-600 rounded-xl text-xl font-bold text-white
                hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95 transition"
                >
                  Sign In
                </button>
              </li>

              <li className="my-4 flex flex-col justify-center items-center">
                <span className="text-md text-zinc-800 font-bold">
                  Don't have an account?
                </span>
                <button
                  onClick={handleClickSignUp}
                  type="button"
                  className="w-full flex-grow h-[70px] border border-zinc-600 rounded-xl text-xl font-bold text-zinc-800
                hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95 transition"
                >
                  Sign Up Here
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

export default Login;
