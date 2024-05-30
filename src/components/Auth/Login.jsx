import useField from "../../hooks/useField";

import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";

const Login = () => {
  const userName = useField("text", "username");
  const password = useField("password", "password");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in...");
  };

  return (
    <>
      <Header />
      <div className="w-full flex-grow flex flex-col justify-center items-center">
        <div className="flex-grow max-w-[600px] min-w-[360px] max-h-[400px] p-8 flex justify-center items-center border border-red-500 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <ul>
              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-slate-600">
                  USERNAME:
                </label>
                <input
                  className="w-full flex-grow p-2 rounded-lg border border-slate-500 
              hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:bg-slate-100 placeholder:text-slate-500 transition"
                  {...userName}
                />
              </li>
              <li className="my-4 w-full flex-grow flex flex-col">
                <label className="text-md font-medium text-slate-600">
                  PASSWORD:
                </label>
                <input
                  className="w-full flex-grow p-2 rounded-lg border border-slate-500 
                  hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:bg-slate-100 placeholder:text-slate-500 transition"
                  {...password}
                />
              </li>
              <li className="flex justify-center items-center">
                <button
                  type="submit"
                  className="flex-grow h-[70px] bg-red-600 rounded-xl text-xl font-bold text-white
                hover:bg-red-700 active:scale-95 transition"
                >
                  Sign In
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
