import React, { useEffect } from "react";
import { useState } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ url });
    fetch("http://localhost:5000/data", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "textExtracted");
      });
  };
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  const handleClick = () => {
    window.location.href = "./profile";
  };
  return (
    <div>
      <h2>DASHBOARD</h2>
      <ul>
        <li>
          <a href="default.asp">Home</a>
        </li>
        <li>
          <a href="news.asp">News</a>
        </li>
        <li>
          <a href="#" onClick={handleClick}>
            Profile
          </a>
        </li>
        <li>
          <a href="#" onClick={logOut}>
            Logout
          </a>
        </li>
      </ul>
      <br />
      <br />
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Enter URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter URL"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
