import React, { useEffect, useState } from "react";
import "./player.css";
import Queue from "../../components/queue/queue";
import SongCard from "../../components/songCard/songCard.jsx";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import AudioPlayer from "../../components/audioPlayer/audioPlayer";
import MoonLoader from "react-spinners/MoonLoader";


export default function Player() {
  const location = useLocation();

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boolArtist, setBoolArtist] = useState();

  useEffect(() => {
    setLoading(true);

    try {
      if (location.state.id) {
        apiClient
          .get("playlists/" + location.state.id + "/tracks")
          .then((res) => {
            setCurrentTrack(res.data.items[0].track);
            setTracks(res.data.items);
            setCurrentIndex(currentIndex);
            setBoolArtist(false);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log("Playlist Error");
    }
  }, [location.state]);

  useEffect(() => {
    setLoading(true);
    if (location.state.trackid) {
      apiClient
        .get("tracks/" + location.state.trackid + "?market=in")
        .then((res) => {
          setCurrentTrack(res.data);
          setBoolArtist(true);
          setLoading(false);
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state.artistId) {
      apiClient
        .get("artists/" + location.state.artistId + "/top-tracks?market=IN")
        .then((res) => {
          setTracks(res.data.tracks);
          setCurrentIndex(location.state.index);
          setBoolArtist(true);
        });
    }
  }, [location.state]);

  // let trackUpdated = {};
  // if (tracks[currentIndex]) {
  //   trackUpdated = tracks[currentIndex].track;
  // }

  useEffect(() => {
    setCurrentTrack(
      boolArtist ? tracks[currentIndex] : tracks[currentIndex]?.track
    );
  }, [currentIndex, tracks]);

  return loading ? (
    <div className="loader-page">
      <MoonLoader color={color} loading={loading} size={50} />
    </div>
  ) : (
    <div className="elements-container flex">
      <div className="left-body">
        <SongCard album={currentTrack?.album} track={currentTrack} />
        <AudioPlayer
          currentTrack={currentTrack}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          total={tracks}
          isArtistTrack={boolArtist}
        />
      </div>
      <div className="right-body">
        <Queue
          currentIndex={currentIndex}
          tracks={tracks}
          setCurrentIndex={setCurrentIndex}
          isArtistTrack={boolArtist}
          currentTrack={currentTrack}
        />
      </div>
    </div>
  );
}
