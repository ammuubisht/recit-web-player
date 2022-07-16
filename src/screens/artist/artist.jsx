import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import apiClient from "../../spotify";
import { BiArrowBack } from "react-icons/bi";
import "./artist.css";
import "../library/library.css";
import MoonLoader from "react-spinners/MoonLoader";

export default function Artist() {
  const location = useLocation();

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [artisttracks, setArtistTracks] = useState([]);
  const [artistinfo, setArtistInfo] = useState({});
  const [relatedArtists, setRelatedArtists] = useState([]);

  // Get Tracks of Artist
  useEffect(() => {
    setLoading(true);
    if (location.state) {
      apiClient
        .get("artists/" + location.state.id + "/top-tracks?market=in")
        .then((res) => {
          setArtistTracks(res.data.tracks);
          // console.log(res.data.tracks);
          setLoading(false);
        });
    }
  }, []);

  // Get Artist Info
  useEffect(() => {
    if (location.state) {
      apiClient.get("artists/" + location.state.id).then((res) => {
        setArtistInfo(res.data);
        // console.log(res.data);
      });
    }
  }, []);

  // Get Similar Artists
  useEffect(() => {
    if (location.state) {
      apiClient
        .get("artists/" + location.state.id + "/related-artists")
        .then((res) => {
          setRelatedArtists(res.data.artists);
          console.log(res.data.artists);
        });
    }
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (trackid, artistId, index) => {
    navigate("/player", {
      state: { trackid: trackid, artistId: artistId, index: index },
    });
  };

  const artistSongs = (id) => {
    navigate("/artist", { state: { id: id } });
    window.location.reload();
  };

  const navigateBack = () => {
    navigate("/");
  };

  return loading ? (
    <div className="loader-page">
      <MoonLoader color={color} loading={loading} size={50} />
    </div>
  ) : (
    <div className="elements-container flex">
      <div className="left-body2">
        <div className="section-headWrapper3">
          <div className="backIconDiv" onClick={() => navigateBack()}>
            <IconContext.Provider
              value={{
                size: "40px",
                className: "back-icon",
              }}
            >
              <BiArrowBack />
            </IconContext.Provider>
          </div>
          <h1 className="section-titleArtist">
            {artistinfo.name}'s Top Tracks
          </h1>
        </div>
        <div className="artistTrackCont">
          {artisttracks.map((artistTrack, index) => (
            <div
              key={artistTrack.id}
              className="indTracks flex"
              onClick={() =>
                playPlaylist(artistTrack.id, location.state.id, index)
              }
            >
              <img
                src={artistTrack.album.images[0].url}
                className="list-track-icon"
                alt="track-icon"
              />
              <p className="artistTrackName">{artistTrack.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="right-body2">
        <h3 className="similar-artist-head">Similar Artist's you might like</h3>
        <div className="library-body artist">
          {relatedArtists.slice(0, 6).map((relatedArtist) => (
            <div
              className="artist-card"
              key={relatedArtist.id}
              onClick={() => artistSongs(relatedArtist.id)}
            >
              <img
                src={relatedArtist.images[0]?.url}
                alt="artist-icon"
                className="artist-icon-sugg"
              />
              <p className="artist-name-sugg">{relatedArtist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
