import React from "react";
import "../styles/HomePage.css";
import MovieCard from "@/components/MovieCard";

const HomePage = () => {
  return (
    <div className="container">
      <div className="heroPage">
        <div className="header">
          <div className="nav">
            <div className="logo_container">
              <img src="tv.svg" alt="logo" />
              <h2>MovieBox</h2>
            </div>
            <div className="form_search">
              <input type="text" placeholder="What do you want to watch?" />
              <i className="fas fa-search"></i>
            </div>
            <div className="nav_bar">
              <ul>
                <li>
                  <a href="#">Sign in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hero">
          <h1 className="main_title">John Wick 3 : Parabellum</h1>
          <div className="rating">
            <img src="imdb.svg" />
            <p>86.0/100 97%</p>
          </div>
          <p className="main_text">
            John Wick is on the run after killing a member of the international
            assassins' guild, and with a $14 million price tag on his head, he
            is the target of hit men and women everywhere.
          </p>
          <div className="form_button">
            <i className="fa-solid fa-play"></i>
            <input type="text" placeholder="WATCH TRAILER" />
          </div>
        </div>
      </div>
      <div className="features">
        <div className=""></div>
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default HomePage;
