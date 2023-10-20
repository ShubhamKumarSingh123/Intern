import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";

export const SidebarData = [
  {
    title: "Dashbord",
    icon: <DashboardIcon />,
    link: "/dashboard",
    id: 1,
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    link: "/Users",
    id: 2,
  },
  {
    title: "Product",
    icon: <InventoryIcon />,
    link: "/dashboard",
    id: 3,
  },
  {
    title: "LogOut",
    icon: <LogoutIcon />,
    link: "/dashboard",
    id: 4,
  },
];
