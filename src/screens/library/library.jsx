import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import apiClient from "../../spotify";
import { BsPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./library.css";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // const [username, setUsername] = useState("");

  // Fetching Playlist Details from API

  useEffect(() => {
    apiClient
      .get("me/top/artists?time_range=medium_term&limit=6&offset=5")
      .then((response) => {
        setArtists(response.data.items);
        // console.log(response.data.items);
      });
  }, []);

  useEffect(() => {
    apiClient.get("me/playlists?limit=6").then((response) => {
      setPlaylists(response.data.items);
    });
  }, []);

  // get recently played tracks
  useEffect(() => {
    apiClient
      .get("me/player/recently-played?limit=6&after=1484811043508")
      .then((response) => {
        setRecentlyPlayed(response.data.items);
        console.log(response.data.items);
      });
  }, []);

  // Fetching Artist Details from API

  // To Display User Information from spotify
  // useEffect(() => {
  //   apiClient.get("me").then(
  //       (response) => {
  //           // setUsername(response.data.display_name);
  //           console.log(response.data);
  //       }
  //   )
  // }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };
  const artistSongs = (id) => {
    navigate("/artist", { state: { id: id } });
  };

  const seeAllPlaylist = () => {
    navigate("/playlists");
  };

  const seeAllArtists = () => {
    navigate("/top-artists");
  };

  return (
    <div className="elements-container">
      {/* Recently Played section */}
      <div className="section-headWrapper">
        <h3 className="section-title">Recently Played</h3>
      </div>
      <div className="library-body">
        {recentlyPlayed.map((recent) => (
          <div
            className="recently-played-card"
            key={recent.track.id}
            // onClick={() => playPlaylist(recent.track.id)}
          >
            <img
              src={recent.track?.album?.images[0]?.url}
              className="recently-played-icon"
              alt="Playlist Icon"
            />
            <div className="playlist-play-rec">
              <IconContext.Provider
                value={{
                  size: "50px",
                  color: "#1db954",
                  className: "play-icon",
                }}
              >
                <BsPlayCircleFill />
              </IconContext.Provider>
            </div>
            <p className="playlist-title">{recent.track.name}</p>
          </div>
        ))}
      </div>

      {/* Playlist Section */}
      {/* <h1 style={{fontSize: '32px', color:'#fff', textAlign:'center'}}>Recit</h1> */}
      <div className="section-headWrapper">
        <h3 className="section-title">Your Playlists</h3>
        <h3 className="section-subtitle" onClick={() => seeAllPlaylist()}>
          See all
        </h3>
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
                  color: "#1db954",
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

      {/* Explore Artists  */}
      <div className="section-headWrapper">
        <h3 className="section-title">Explore Artists</h3>
        <h3 className="section-subtitle" onClick={() => seeAllArtists()}>
          See all
        </h3>
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
