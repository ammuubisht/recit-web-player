import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { IoLibrary } from "react-icons/io5";
import { BsFillPlayFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import apiClient from "../../spotify";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1590700722804-caef4fed22e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );
  // const [token, setToken] = useState("");
  // const [userId, setUserId] = useState("");

  const disabledPlayer = true;
  
  // To Display User Information from spotify
  useEffect(() => {
    if(window.localStorage.getItem("token_time") < parseInt(Date.now())){
      window.localStorage.removeItem("token");
      window.localStorage.clear();
      window.location.reload();

    }
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
      // setUserId(response.data.id);
      // console.log(response.data.id);
    });

  }, []);

  return (

    <div className="sidebar-cont">
      <Link to='/profile'>
      <img src={image} className="profile-photo" alt="profile" /></Link>
      <div>
        <SidebarButton
          title="Library"
          to="/"
          icon={<IoLibrary />}
          disabled={false}
        />
        {/* <SidebarButton
          title="Feed"
          to="/feed"
          icon={<MdSpaceDashboard />}
          disabled={false}
        />
        <SidebarButton
          title="Explore"
          to="/explore"
          icon={<FaGripfire />}
          disabled={false}
        /> */}
        <SidebarButton
          title="Player"
          to="/player"
          icon={<BsFillPlayFill />}
          disabled={disabledPlayer}
        />
      </div>
      <SidebarButton
        title="Sign Out"
        to="/login"
        icon={<FaSignOutAlt />}
        disabled={false}
      />
    </div>
  );
}
