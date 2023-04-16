import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Header from "./components/Header";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/category/:categoryName" element={<CoursePage />} />
          <Route
            path="/category/:categoryName/:postId"
            element={<SinglePost />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
