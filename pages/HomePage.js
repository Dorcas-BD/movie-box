"use client";
import React from "react";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import SearchBox from "@/components/SearchBox/SearchBox";
import dotenv from "dotenv";

dotenv.config();

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=85b27a45d9bec629452daa02247b315c&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchPopularMovies();
  }, []);

  const fetchSearchResults = async () => {
    if (searchValue.trim() === "") {
      // Don't make the API request if the search input is empty
      setSearchResults([]);
      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=85b27a45d9bec629452daa02247b315c&language=en-US&query=${encodeURIComponent(
        searchValue
      )}&page=1`
    );

    const data = await response.json();
    setSearchResults(data.results);
  };

  // Use effect to fetch search results when searchValue changes
  useEffect(() => {
    fetchSearchResults();
  }, [searchValue]);

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
              <SearchBox
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
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
        {/* Display movies based on search results or popular movies */}
        {searchValue.trim() === "" ? (
          <MovieCard movies={movies} />
        ) : (
          <MovieCard movies={searchResults} />
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default HomePage;
