import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import UserDetails from "./components/userDetails";
import Profile from "./components/Profile";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      {/* <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner"> */}
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* </div>
        </div>
      </div> */}
    </Router>
  );
}

export default App;
