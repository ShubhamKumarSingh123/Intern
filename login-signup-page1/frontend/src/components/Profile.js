import React, { useEffect } from "react";
import { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState("");
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
  return (
    <div>
      <h2>
        Name : {userData.fname} {userData.lname}
      </h2>
      <h2>Email : {userData.email} </h2>
    </div>
  );
};

export default Profile;
