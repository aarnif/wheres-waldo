import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Signup from "./pages/Signup";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/games/:id" element={<Game />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default App;
