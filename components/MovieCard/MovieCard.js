"use client";

import React from "react";
import "./MovieCard.css";

const MovieCard = () => {
  return (
    <div className="movie-card" data-testid="movie-card">
      {props.movies.map((movie, index) => (
        <div className="list">
          <img src={movie.Poster} alt="movie" data-testid="movie-poster" />
          <div className="movie-list"></div>
          <h2 className="movie-title" data-testid="movie-title">
            {movie.title}
          </h2>
          <p className="movie-release-date" data-testid="movie-release-date">
            Release Date: {movie.release_date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
