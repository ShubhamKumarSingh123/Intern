import React from "react";
import "./sidebar.css";
import { SidebarData } from "./sidebarData";

const Sidebar = () => {
  return (
    <div className="SideBar">
      <ul className="SideBarList">
        <h1>PEOPLE</h1>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
