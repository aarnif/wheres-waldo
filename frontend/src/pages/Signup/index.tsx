import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../types";
import { signUp } from "../../services/users";
import { login } from "../../services/auth";
import Error from "../../components/Error";
import FormField from "../../components/FormField";
import useAuth from "../../hooks/useAuth";
import useErrorMessage from "../../hooks/useErrorMessage";
import useField from "../../hooks/useField";
import { setToken } from "../../helpers/token";

const Signup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { message, showMessage, closeMessage } = useErrorMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const username = useField("username", "text", "Enter your username here...");
  const password = useField(
    "password",
    "password",
    "Enter your password here...",
  );
  const confirmPassword = useField(
    "confirmPassword",
    "password",
    "Confirm your password here...",
  );

  const validateSignUpForm = (
    username: string,
    password: string,
    confirmPassword: string,
  ): string | null => {
    if (!username.length || !password.length || !confirmPassword.length) {
      return "Please fill all fields";
    }

    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const validationError = validateSignUpForm(
      username.value,
      password.value,
      confirmPassword.value,
    );

    if (validationError) {
      showMessage(validationError);
      return;
    }

    const credentials = {
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    setIsSubmitting(true);

    signUp(credentials)
      .then(() => {
        login({
          username: credentials.username,
          password: credentials.password,
        })
          .then((loginResponse) => {
            const { token } = loginResponse;
            setToken(token);
            const decoded = jwtDecode<DecodedToken>(token);
            setUser({ id: decoded.id, username: decoded.username });
            navigate("/");
          })
          .catch(() => {
            showMessage(
              "Failed to log in after sign up. Please try logging in manually.",
            );
          });
      })
      .catch((error) => {
        showMessage(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex min-h-screen bg-[url('/background.png')]">
      <h1 className="font-title absolute top-4 left-4 text-3xl font-bold text-red-600 sm:text-4xl">
        Where's Waldo
      </h1>
      <div className="flex grow items-center justify-center bg-linear-to-r to-slate-800 to-50% p-4 sm:to-30%">
        <form
          className="flex w-full max-w-96 flex-col gap-8 rounded-2xl border border-slate-600/40 bg-slate-600/20 p-4 shadow-lg backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <h1 className="font-title text-3xl font-black text-red-600">
              Sign Up
            </h1>
            <p className="text-left font-medium text-slate-200">
              Create an account to save your progress.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <AnimatePresence>
              {message && (
                <Error message={message} closeMessage={closeMessage} />
              )}
            </AnimatePresence>
            <FormField field={username} disabled={isSubmitting} />
            <FormField field={password} disabled={isSubmitting} />
            <FormField field={confirmPassword} disabled={isSubmitting} />
          </div>
          <div className="flex gap-2 text-white">
            <button
              type="submit"
              disabled={isSubmitting}
              className="grow cursor-pointer rounded-lg bg-red-600 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <Link
              to="/"
              className="grow rounded-lg bg-slate-500 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
