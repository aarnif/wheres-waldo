import { Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:id" element={<Game />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  </AuthProvider>
);

export default App;
