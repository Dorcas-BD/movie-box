import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieCard.css";
import Link from "next/link";

const MovieCard = ({ movies }) => {
  const [favoriteStatus, setFavoriteStatus] = useState(
    Array(movies.length).fill(false)
  );
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: "85b27a45d9bec629452daa02247b315c",
            },
          }
        );
        const genreData = {};
        response.data.genres.forEach((genre) => {
          genreData[genre.id] = genre.name;
        });
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const toggleFavorite = (index) => {
    const updatedFavoriteStatus = [...favoriteStatus];
    updatedFavoriteStatus[index] = !updatedFavoriteStatus[index];
    setFavoriteStatus(updatedFavoriteStatus);
  };

  if (!movies || movies.length === 0) {
    return <div className="movie-card">No movies to display.</div>;
  }

  const displayedMovies = movies.slice(0, 10);

  return (
    <div className="movie-card">
      <div className="features_title">
        <h2>Featured Movie</h2>
        <p>See More &gt;</p>
      </div>
      <div className="movie-list-grid">
        {displayedMovies.map((movie, index) => (
          <div key={index} className="movie-item" data-testid="movie-card">
            <div className="moviee">
              <Link href={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="movie"
                  data-testid="movie-poster"
                />
                <p data-testid="movie-release-date"> {movie.release_date}</p>
                <h2 className="movie-title" data-testid="movie-title">
                  {movie.title}
                </h2>
                <div className="rating">
                  <div className="vote">
                    <img src="imdb.svg" alt="IMDB Logo" />
                    <p> {movie.vote_average}/10</p>
                  </div>
                  <div className="vote-rate">
                    <img src="orange.svg" />
                    <p>{movie.popularity}%</p>
                  </div>
                </div>
              </Link>
              <p>
                {" "}
                {movie.genre_ids.map((genreId) => genres[genreId]).join(", ")}
              </p>
              <button
                className={
                  favoriteStatus[index]
                    ? "favorite-button active"
                    : "favorite-button"
                }
                onClick={() => toggleFavorite(index)}
              >
                {favoriteStatus[index] ? (
                  <span>&#x2764;</span>
                ) : (
                  <span>&#x1F90D;</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
