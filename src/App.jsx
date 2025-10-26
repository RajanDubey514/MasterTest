// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AddDataForm from "./pages/addData/AddDataForm";
import PersistentDrawerLeft from "./component/PersistentDrawerLeft";
import Login from "./pages/loginPage/Login";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Login setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PersistentDrawerLeft>
              <Home />
            </PersistentDrawerLeft>
          </PrivateRoute>
        }
      />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <PersistentDrawerLeft>
              <About />
            </PersistentDrawerLeft>
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/add"
        element={
          <PrivateRoute>
            <PersistentDrawerLeft>
              <AddDataForm />
            </PersistentDrawerLeft>
          </PrivateRoute>
        }
      /> */}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
