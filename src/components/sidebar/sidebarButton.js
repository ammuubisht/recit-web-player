import React from "react";
import "./sidebarButton.css";
import { IconContext } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";

export default function SidebarButton(props) {
  const Location = useLocation();

  const isActive = Location.pathname === props.to;

  const btnClass = isActive ? "btn-body active" : "btn-body";
  return (
    <Link
      to={props.to}
      style={props.disabled ? { pointerEvents: "none" } : null}
    >
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
          {props.icon}
          <p className="btn-title">{props.title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}
