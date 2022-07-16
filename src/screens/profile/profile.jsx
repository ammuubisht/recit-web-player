import React, { useState, useEffect } from "react";
import apiClient from "../../spotify";
import MoonLoader from "react-spinners/MoonLoader";


import "./profile.css";

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1590700722804-caef4fed22e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );
  const [followedArtist, SetFollowedArtist] = useState("");
  const [playlistCount, SetPlaylistCount] = useState("");
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);

  useEffect(() => {
    setLoading(true);

    apiClient.get("me").then((response) => {
      setUserProfile(response.data);
      setImage(response.data.images[0].url);
      apiClient.get("users/" + response.data.id + "/playlists").then((res) => {
        SetPlaylistCount(res.data.total);
        setLoading(false);

      });
    });
  }, []);

  useEffect(() => {
    apiClient.get("me/following?type=artist").then((response) => {
      SetFollowedArtist(response.data.artists.limit);
    });
    apiClient.get("me/top/artists?limit=10").then((response) => {
      // console.log(response.data.items);
      setUserTopArtists(response.data.items);
    });
    apiClient.get("me/top/tracks?limit=10").then((response) => {
      console.log(response.data.items);
      setUserTopTracks(response.data.items);
    });
  }, []);

  const msToMinutes = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  // useEffect(() => {
  //   if (location.state.id) {

  //   }
  // }, []);

  return loading ? (
    <div className="loader-page">
      <MoonLoader color={color} loading={loading} size={50} />
    </div>
  ) :  (
    <div className="elements-container">
      <div className="upper-cont flex">
        <img src={image} className="profile-photo2" alt="profile" />
        <a href={userProfile.external_urls?.spotify} className="username">
          {userProfile.display_name}
        </a>
        <div className="user-stats flex">
          <div className="user-stats-ind">
            <div className="stat-count">{userProfile.followers?.total}</div>
            <div className="stat-name">Followers</div>
          </div>
          <div className="user-stats-ind">
            <div className="stat-count">{followedArtist}</div>
            <div className="stat-name">Following</div>
          </div>
          <div className="user-stats-ind">
            <div className="stat-count">{playlistCount}</div>
            <div className="stat-name">Playlists</div>
          </div>
        </div>
      </div>

      <div className="bottom-cont">
        <div className="top-artists-section">
          <h3 className="artists-heading">Your Top Artists</h3>
          {userTopArtists.map((artist) => (
            <div className="artist-block flex" key={artist.id}>
              <div>
                <img
                  src={artist.images[0]?.url}
                  alt="artist-icon"
                  className="artist-iconProfile"
                />
              </div>
              <div className="artist-name">{artist.name}</div>
            </div>
          ))}
        </div>
        <div className="top-artists-section">
          <h3 className="artists-heading">Your Top Tracks</h3>
          {userTopTracks.map((track) => (
            <div className="track-block flex" key={track.id}>
              <div>
                <img
                  src={track.album.images[0]?.url}
                  alt="album-icon"
                  className="album-iconProfile"
                />
              </div>
              <div className="track-details-flex">
                <div className="track-details2">
                <div className="track-name">{track.name}</div>
                <div className="track-info flex">
                  {track.artists.map((artist, i) => (
                    <div>
                      {artist.name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ""
                        : ","}
                      &nbsp;
                    </div>
                  ))}
                  &nbsp;&middot;&nbsp;&nbsp;
                  <div className="album-name">{track.album.name}</div>
                </div>
                </div>
                
              <div className="track-duration">{msToMinutes(track.duration_ms)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
