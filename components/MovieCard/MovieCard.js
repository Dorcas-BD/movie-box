"use client";

import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-card" data-testid="movie-card">
        No movies to display.
      </div>
    );
  }

  return (
    <div className="movie-card" data-testid="movie-card">
      {movies.map((movie, index) => (
        <div key={index} className="movie-list">
          <div className="moviee">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt="movie"
              data-testid="movie-poster"
            />
            <h2 className="movie-title" data-testid="movie-title">
              {movie.title}
            </h2>
            <p data-testid="movie-release-date">{movie.releaseYear}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
