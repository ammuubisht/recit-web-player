import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library/library.jsx";
import Feed from "../feed/feed";
import Explore from "../explore/explore";
import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";
import Player from "../player/player.js";
import Playlists from "../playlists/playlists.jsx";
import Artist from "../artist/artist.jsx";
import TopArtists from "../top-artists/top-artists.jsx";
import SignOut from "../sign-out/sign-out.jsx";
import Profile from "../profile/profile.jsx";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    // window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      const expiresIn = window.location.href.split("&")[2].split("=")[1];
      // console.log(expiresIn);
      window.localStorage.setItem("token", _token);
      window.localStorage.setItem("expires_in", expiresIn);
      window.localStorage.setItem("token_time", parseInt(Date.now()) + 3600000);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  
  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/player" element={<Player />} />
          <Route path="/login" element={<SignOut />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
