import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album, track }) {
  const artists = [];
  // console.log(album);
  if (album.artists) {
    album.artists.forEach((element) => {
      artists.push(element.name);
    });
  }

  // console.log((album.name + " - " + artists.join(", ")).length);
  let varAlbumClass = "albumClass";
  // if ((track.name).length > 30) {
  //   varAlbumClass = "marquee";
  // }
  // console.log((track.name).length())

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className={varAlbumClass}>
          <p className="currTrackName"> {track.name}</p>
        </div>

        <p className="artistName"> {artists.join(", ")}</p>
      </div>
      {/* <div className="albumInfo">
        <p></p>
      </div>
      <div className="albumRelease">
        <p></p>
      </div> */}
    </div>
  );
}
