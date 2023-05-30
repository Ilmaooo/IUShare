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
import SinglePost from "./pages/SinglePost";
import ShareNotes from "./pages/ShareNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdditionalInfoForm from "./components/AdditionalInfoForm";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/additional-info" element={<AdditionalInfoForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/share-notes" element={<ShareNotes />} />
          <Route path="/category/:coursecode" element={<CoursePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            path="/category/:coursecode/:postId"
            element={<SinglePost />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
