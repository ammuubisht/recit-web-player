import React from "react";
import { loginEndPoint } from "../../spotify";
import "./login.css";
import { BsGithub , BsLink45Deg, BsInstagram, BsLinkedin} from "react-icons/bs";
import { IconContext } from "react-icons/lib";

export default function Login() {

  const githubURL = 'https://www.github.com/ammuubisht';
  const portfolioURL = 'https://amitbisht.in';
  const instaURL = 'https://instagram.com/ammuu.bisht';
  const linkedInURL = 'https://www.linkedin.com/in/amitbisht289/';

  const openGitub = () =>{
    window.open(githubURL, '_blank')
  }

  const openPortfolio = () =>{
    window.open(portfolioURL, '_blank')
  }

  const openInstagram= () =>{
    window.open(instaURL, '_blank');
  }

  const openLinkedin = () =>{
    window.open(linkedInURL, '_blank');
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
          <BsLink45Deg onClick={()=>openPortfolio()}/>
          <BsGithub onClick={()=>openGitub()}/>
          <BsInstagram onClick={()=>openInstagram()}/>
          <BsLinkedin onClick={()=>openLinkedin()}/>
        </IconContext.Provider>
      </div>
      <div className="footer">
        <p className="footer-text">
          Made with ❤️ by Amit Bisht
        </p>
      </div>
    </div>
  );
}
