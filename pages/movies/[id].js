import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieId = window.location.pathname.split("/").pop(); // Extract movie ID from the URL
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "85b27a45d9bec629452daa02247b315c", // Replace with your TMDb API key
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <h2 data-testid="movie-title">Title: {movie.title}</h2>
      <p data-testid="movie-release-date">{movie.release_date}</p>
      <p data-testid="movie-runtime">{movie.runtime}</p>
      <p data-testid="movie-overview"> {movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
