"use client";
import React from "react";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import SearchBox from "@/components/SearchBox/SearchBox";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=1f2d60f1c0b7a2b3b8b0a0a0e1a0a0a0&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMovies();
  }, []);
  console.log(movies);

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
              <SearchBox searchValue={movie} setSearchValue={setSearchValue} />
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
        <MovieCard movies={movies} />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default HomePage;
