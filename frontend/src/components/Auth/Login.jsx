import signingService from "../../services/signingService";
import useField from "../../hooks/useField";

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
    <div className="w-full flex-grow flex flex-col justify-center items-center">
      <div className="w-full flex-grow flex flex-col">
        <div className="flex-grow w-full flex justify-center items-center">
          <div
            className="flex-grow max-w-[500px] max-h-[600px] p-8 flex justify-center items-center
         bg-slate-700 bg-opacity-90 rounded-xl text-white shadow-xl"
          >
            <form
              onSubmit={handleSubmit}
              className="flex-grow h-full flex flex-col"
            >
              <h1 className="text-2xl font-bold" data-testid="sign-in-header">
                Sign In
              </h1>
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
                    data-testid="username-input"
                    className="w-full flex-grow p-2 rounded-lg bg-slate-500
                  focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-200 transition"
                    {...userName}
                  />
                  {userName.value.length === 0 && (
                    <span className="text-sm text-red-500">
                      Please enter your username
                    </span>
                  )}
                </li>

                <li className="my-4 w-full flex-grow flex flex-col">
                  <label className="text-md font-medium text-slate-200">
                    PASSWORD:
                  </label>
                  <input
                    data-testid="password-input"
                    className="w-full flex-grow p-2 rounded-lg bg-slate-500
          focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-200 transition"
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
                    data-testid="sign-in-button"
                    type="submit"
                    className="flex-grow h-[70px] bg-green-500 border-2 border-green-500 rounded-xl text-xl font-bold text-white
                hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95 transition"
                  >
                    Sign In
                  </button>
                </li>

                <li className="my-4 flex flex-col justify-center items-center">
                  <span className="text-md font-bold text-slate-200">
                    Don't have an account?
                  </span>
                  <button
                    onClick={handleClickSignUp}
                    type="button"
                    data-testid="sign-up-button"
                    className="w-full flex-grow h-[70px] border-2 border-slate-200 rounded-xl text-xl font-bold text-slate-200
                hover:bg-slate-500 focus:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95 transition"
                  >
                    Sign Up Here
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
