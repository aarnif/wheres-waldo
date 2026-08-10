import { Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Signup from "./pages/Signup";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:id" element={<Game />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </AuthProvider>
);

export default App;
