import { Routes, Route } from "react-router";
import AuthProvider from "./components/AuthProvider";
import NotificationProvider from "./components/NotificationProvider";
import Home from "./pages/Home";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";

const App = () => (
  <AuthProvider>
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<Game />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </NotificationProvider>
  </AuthProvider>
);

export default App;
