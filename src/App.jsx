import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewStoryForm from "./pages/NewStoryForm";
import Post from "./components/Post";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Check if the user is authenticated when the app loads (after a refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setCurrentUserId(localStorage.getItem("userId"));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (userId) => {
    setIsAuthenticated(true);
    setCurrentUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const Layout = () => {
    const location = useLocation();
    const shouldRenderNavBar = !["/login", "/signup"].includes(location.pathname);

    return (
      <>
        {shouldRenderNavBar && (
          <NavBar
            userId={currentUserId}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated Routes */}
          <Route
            path="/blog"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/post/:postId"
            element={isAuthenticated ? <PostDetailPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/add-story"
            element={isAuthenticated ? <NewStoryForm /> : <Navigate to="/login" replace />}
          />
         
         <Route path="/profile/:userId" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />


          {/* Public Routes */}
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
