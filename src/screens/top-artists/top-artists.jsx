import React, { useState, useEffect } from "react";
import "./top-artists.css";
import "../library/library.css";
import "../playlists/playlists.css";
import { IconContext } from "react-icons/lib";
import apiClient from "../../spotify";
import { BiArrowBack } from "react-icons/bi";
// import { BsPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TopArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    apiClient
      .get("me/top/artists?time_range=medium_term&offset=5")
      .then((response) => {
        setArtists(response.data.items);
        // console.log(response.data.items);
      });
  }, []);

  const navigate = useNavigate();

  const artistSongs = (id) => {
    navigate("/artist", { state: { id: id } });
  };

  const navigateBack = () => {
    navigate(-1);
  };
  return (
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
        <h3 className="section-title">Your Top Artists</h3>
      </div>
      <div className="library-body">
        {artists.map((artist) => (
          <div
            className="artist-card"
            key={artist.id}
            onClick={() => artistSongs(artist.id)}
          >
            <img
              src={artist.images[0]?.url}
              alt="artist-icon"
              className="artist-icon"
            />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
