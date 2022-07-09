import React, { useState, useEffect } from "react";
import { setClientToken } from "../../spotify";
import Login from "../auth/login";

export default function SignOut() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    window.localStorage.removeItem('token')
    window.location.reload();
    if (!token && hash) {
      setToken(null);
      setClientToken(null);
    } else {
      setToken(null);
      setClientToken(null);
    }
  }, []);

  return <Login /> ;
}
