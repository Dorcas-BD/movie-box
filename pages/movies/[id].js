import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerVideoId, setTrailerVideoId] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: "85b27a45d9bec629452daa02247b315c",
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

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: "AIzaSyAIKFlFDTiw85gzQOZBGSpdIQuYXlI4XDM",
              q: `${movie?.title || ""} trailer`,
              part: "snippet",
              type: "video",
              maxResults: 1,
            },
          }
        );
        const videoId = response.data.items[0]?.id?.videoId;
        setTrailerVideoId(videoId);
      } catch (error) {
        console.error("Error fetching trailer video:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }

    if (movie) {
      fetchTrailer();
    }
  }, [id, movie]);

  return (
    <div className="container">
      <div className="trailer">
        {trailerVideoId && (
          <div>
            <iframe
              width="760"
              height="315"
              src={`https://www.youtube.com/embed/${trailerVideoId}`}
              title="Trailer"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
      <div>
        {movie ? (
          <div>
            <h2 data-testid="movie-title">Title: {movie.title}</h2>
            <p data-testid="movie-release-date">{movie.release_date}</p>
            <p data-testid="movie-runtime">{movie.runtime}</p>
            <p data-testid="movie-overview"> {movie.overview}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
