// MovieCard.js

import React, { useState } from "react";
import "./MovieCard.css";
import Link from "next/link";

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

  const displayedMovies = movies.slice(0, 10);

  return (
    <div className="movie-card" data-testid="movie-card">
      <div className="movie-list-grid">
        {displayedMovies.map((movie, index) => (
          <div key={index} className="movie-item">
            <div className="moviee">
              <Link href={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="movie"
                  data-testid="movie-poster"
                />
              </Link>
              <p data-testid="movie-release-date"> {movie.release_date}</p>
              <h2 className="movie-title" data-testid="movie-title">
                {movie.title}
              </h2>
              <div className="rating">
                <img src="imdb.svg" alt="IMDB Logo" />
                <p> {movie.vote_average}/10</p>
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
    </div>
  );
};

export default MovieCard;
