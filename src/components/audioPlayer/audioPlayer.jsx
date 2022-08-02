import React, { useEffect, useRef, useState } from "react";
// import ReactSlider from "react-slider";
import "./audioPlayer.css";
import Controls from "./controls";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
  isArtistTrack,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);

  var audioSrc = isArtistTrack
    ? total[currentIndex]?.preview_url
    : total[currentIndex]?.track.preview_url;

  const audioRef = useRef(
    new Audio(
      isArtistTrack ? total[currentIndex]?.preview_url : total[currentIndex]?.track.preview_url
    )
  );



  // console.log(isArtistTrack)
  // console.log("Audio URL", audioRef.current);
  // console.log("Audio URL",audioSrc);
  // console.log(audioRef.current);

  const intervalRef = useRef();
  const isReady = useRef(false);
  // const { duration } = audioRef.current;

  // const currPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  // FunctionTo Handle the Timing of Song
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  // // To Play and Pause the SOng;
  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log(error);
        });
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying && audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play().catch((error) => {
          console.log(error);
        });
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Clicking Item on Queue for plaing song
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play().catch((error) => {
        console.log(error);
      });
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
  }, []);

  const handleNext = () => {
    audioRef.current.pause();
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    audioRef.current.pause();
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(total.length - 1);
    }
  };

  //   var audioSrc = total[currentIndex].track.preview_url;
  //   const audioRef = useRef(new Audio(total[currentIndex].track.preview_url));
  //   console.log(audioRef.current);
  //   const intervalRef = useRef();
  //   const isReady = useRef(false);
  //   const { duration } = audioRef.current;

  return (
    <div className="player-body flex">
      {/* <ProgressBar percentage={75} isPlaying={true} /> */}
      <div className="song-duration flex">
        {/* <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
        <p className="duration">0:30</p> */}
      </div>
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNext={handleNext}
        handlePrev={handlePrev}
        total={total}
      />
    </div>
  );
}
