import React from "react";
import { IconContext } from "react-icons";
import "./queue.css";
import { FaPause } from "react-icons/fa";
import '../../screens/artist/artist.css';

export default function Queue({
  currentIndex,
  tracks,
  setCurrentIndex,
  isArtistTrack,
  currentTrack,
}) {

  // console.log(currentTrack);
  // console.log(tracks);
  // let tracksUpdated = [];

  // if (tracks) {
  //   tracksUpdated = tracks;
  // }

  
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <div className="queue-head flex">
        <p className="upNext">Up Next</p>
        <p className="curr-queue">{currentIndex+ 1 + "/" + tracks.length}</p>
        </div>
        <div className="queue-list ">
          {tracks?.map((track, index) => (
            <div
              className={
                isArtistTrack ? (track?.id === currentTrack?.id ? 'queue-items active2': 'queue-items') : (track.track?.id === currentTrack?.id ? 'queue-items active2' : 'queue-items')
                
              }
              key={isArtistTrack ? track.id : track.track.id}
              onClick={() => setCurrentIndex(index)}
            >
              <IconContext.Provider
                value={{
                  size: "25px",
                  color: "#fff",
                  className: "queue-play-icon",
                }}
              >
                {isArtistTrack ? (
                  track?.id === currentTrack?.id ? <FaPause /> : ''
                ) : (track.track?.id === currentTrack?.id ? <FaPause /> : '') 
                }
              </IconContext.Provider>
              <img src={isArtistTrack ? track.album?.images[0]?.url : track.track.album?.images[0]?.url } className='list-track-icon' alt=""/>
              <p className="trackName">
                {isArtistTrack ? track.name : track.track.name}
              </p>
              <p>0:30</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
