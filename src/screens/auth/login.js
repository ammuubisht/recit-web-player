import React from "react";
import { loginEndPoint } from "../../spotify";
import "./login.css";
import { BsGithub , BsLink45Deg, BsInstagram} from "react-icons/bs";
import { IconContext } from "react-icons/lib";

export default function Login() {

  const githubURL = 'https://www.github.com/ammuubisht';
  const portfolioURL = 'https://ammuus.herokuapp.com';
  const instaURL = 'https://instagram.com/ammuu.bisht';

  const openGitub = () =>{
    window.open(githubURL, '_blank')
  }

  const openPortfolio = () =>{
    window.open(portfolioURL, '_blank')
  }

  const openInstagram= () =>{
    window.open(instaURL, '_blank');
  }
  return (
    <div className="login-page">
      <h1 className="login-title">&#127752; Recit - Web Player</h1>
      <h3 className="login-subtitle">
        Listen to song previews, your top artists and much more!
      </h3>
      <a href={loginEndPoint}>
        <div className="login-btn">LOGIN WITH SPOTIFY</div>
      </a>
      <div className="social-links flex">
        <IconContext.Provider value={{ size: "28px", color: "#fff", className:'social-links-icons'}}>
          <BsGithub onClick={()=>openGitub()}/>
          <BsLink45Deg onClick={()=>openPortfolio()}/>
          <BsInstagram onClick={()=>openInstagram()}/>
        </IconContext.Provider>
      </div>
      <div className="footer">
        <p className="footer-text">
          By logging in with Spotify, your profile will be synced in order to
          provide you the best experience.
        </p>
      </div>
    </div>
  );
}
