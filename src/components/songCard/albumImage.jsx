import React from "react";
import "./albumImage.css";

export default function AlbumImage({ url }) {
  
  return <img src={url} alt="album-img" className="album-img" />;
}
