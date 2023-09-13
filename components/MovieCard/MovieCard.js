"use client";

import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ movies }) => {
  const [favoriteStatus, setFavoriteStatus] = useState(
    Array(movies.length).fill(false)
  );

  const toggleFavorite = (index) => {
    const updatedFavoriteStatus = [...favoriteStatus];
    updatedFavoriteStatus[index] = !updatedFavoriteStatus[index];
    setFavoriteStatus(updatedFavoriteStatus);
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-card" data-testid="movie-card">
        No movies to display.
      </div>
    );
  }

  console.log(movies);
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
            <p data-testid="movie-release-year"> {movie.release_date}</p>
            <h2 className="movie-title" data-testid="movie-title">
              {movie.title}
            </h2>
            {/* <p data-testid="movie-overview" className="movie-overview">
              {movie.overview}
            </p> */}
            <p data-testid="movie-genre">{movie.genre}</p>
            <div className="rating">
              <img src="imdb.svg" />
              <p data-testid="movie-rating"> {movie.vote_average}/10</p>
            </div>
            <button
              className={
                favoriteStatus[index]
                  ? "favorite-button active"
                  : "favorite-button"
              }
              onClick={() => toggleFavorite(index)}
            >
              {favoriteStatus[index] ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
