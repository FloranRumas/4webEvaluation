import React from "react";
import "./Home.css";

import { LinkContainer } from "react-router-bootstrap";


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Bienvenue</h1>
        <p>Pour continuer, veuillez vous connectez</p>
        <LinkContainer to="/login">
            <button className="btnLogin">
                Se connecter
            </button>
        </LinkContainer>  
    </div>
    </div>
  );
}