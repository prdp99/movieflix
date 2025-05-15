import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Card from "./pages/Card";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import GetStartedPage from "./components/GetStarted";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/card" element={<Card />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
