import React, { useState, useEffect } from "react";
import "../library/library.css";
import "./playlists.css";

import { IconContext } from "react-icons/lib";
import apiClient from "../../spotify";
import { BiArrowBack } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  // const [username, setUsername] = useState("");

  // Fetching Playlist Details from API
  useEffect(() => {
    setLoading(true);
    apiClient.get("me/playlists").then((response) => {
      setPlaylists(response.data.items);
      setLoading(false);

      // console.log(response.data.items);
    });
  }, []);

  const navigate = useNavigate();
  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };
  const navigateBack = () => {
    navigate(-1);
  };

  return loading ? (
    <div className="loader-page">
      <MoonLoader color={color} loading={loading} size={50} />
    </div>
  ) : (
    <div className="elements-container">
      <div className="section-headWrapper2">
        <div className="backIconDiv" onClick={() => navigateBack()}>
          <IconContext.Provider
            value={{
              size: "30px",
              className: "back-icon",
            }}
          >
            <BiArrowBack />
          </IconContext.Provider>
        </div>

        <h3 className="section-title">All Playlists</h3>
      </div>
      <div className="library-body">
        {playlists.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist.images[0].url}
              className="playlist-icon"
              alt="Playlist Icon"
            />
            <div className="playlist-play">
              <IconContext.Provider
                value={{
                  size: "50px",
                  color: "#1fa24d",
                  className: "play-icon",
                }}
              >
                <BsPlayCircleFill />
              </IconContext.Provider>
            </div>
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-tracks">{playlist.tracks.total} Songs</p>
          </div>
        ))}
      </div>
    </div>
  );
}
