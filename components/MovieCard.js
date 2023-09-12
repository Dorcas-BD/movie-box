import React from "react";
import "./MovieCard/MovieCard.css";

const MovieCard = () => {
  return (
    <div className="movie-card">
      <img src="/movieImg.jpg" />
      <div className="movie-info">
        <h2>Movie Title</h2>
        <p>Release Date:</p>
      </div>
    </div>
  );
};

export default MovieCard;
