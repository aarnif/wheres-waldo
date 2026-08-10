import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { jwtDecode } from "jwt-decode";
import { MdClose } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import useField from "../../hooks/useField";
import useErrorMessage from "../../hooks/useErrorMessage";
import { login } from "../../services/auth";
import FormField from "../../components/FormField";
import Error from "../../components/Error";
import { setToken } from "../../helpers/token";
import type { DecodedToken } from "../../types";

const LoginModal = ({ handleClose }: { handleClose: () => void }) => {
  const { setUser } = useAuth();
  const { message, showMessage, closeMessage } = useErrorMessage();

  const username = useField("username", "text", "Enter your username here...");
  const password = useField(
    "password",
    "password",
    "Enter your password here...",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.value.length || !password.value.length) {
      showMessage("Please fill all fields");
      return;
    }

    const credentials = {
      username: username.value,
      password: password.value,
    };

    setIsSubmitting(true);

    login(credentials)
      .then((response) => {
        const { token } = response;
        setToken(token);
        const decoded = jwtDecode<DecodedToken>(token);
        setUser({ id: decoded.id, username: decoded.username });
        handleClose();
      })
      .catch((error) => {
        showMessage(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center bg-black/80 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.8,
        }}
        onClick={(event) => event.stopPropagation()}
        className="z-10 w-full max-w-120 rounded-lg border border-slate-600/40 bg-slate-600/20 shadow-lg backdrop-blur-sm"
      >
        <form
          className="flex w-full flex-col gap-12 rounded-2xl p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <h1 className="font-title text-3xl font-black text-red-600">
              Log In
            </h1>
            <MdClose
              className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-700"
              onClick={handleClose}
            />
          </div>

          <div className="flex w-full flex-col gap-6">
            <AnimatePresence>
              {message && (
                <Error message={message} closeMessage={closeMessage} />
              )}
            </AnimatePresence>
            <FormField field={username} disabled={isSubmitting} />
            <FormField field={password} disabled={isSubmitting} />
          </div>
          <div>
            <button
              type="submit"
              className={`rounded-lg bg-red-600 px-6 py-1.5 text-sm font-bold text-white shadow-[3px_3px_0px_0px] shadow-slate-950 sm:px-8 sm:py-2 sm:text-base ${!isSubmitting && "cursor-pointer transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
