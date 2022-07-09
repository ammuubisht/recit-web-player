import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard({ album, track }) {
  // const url = "";
  let albumUpdated = {};
  let trackUpdated = {};

  
  if (album) {
    // url = album?.images[0]?.url;
    
    albumUpdated = album;
    trackUpdated = track;
  }
  

  

  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={albumUpdated} track={trackUpdated} />
    </div>
  );
}
