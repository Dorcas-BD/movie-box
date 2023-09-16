import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [stars, setStars] = useState([]);

  const formatGenre = () => {
    if (movie && movie.genres) {
      const genreNames = movie.genres.map((genre) => genre.name);
      return genreNames.join(", ");
    }
    return "";
  };

  const formatRating = () => {
    if (movie && movie.vote_average) {
      return `${movie.vote_average}/10`;
    }
    return "";
  };

  const formatDateToUTC = (dateString) => {
    const localDate = new Date(dateString);
    const utcDate = new Date(
      localDate.getTime() + localDate.getTimezoneOffset() * 60000
    );
    return utcDate.toISOString();
  };

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

    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: "85b27a45d9bec629452daa02247b315c",
            },
          }
        );

        const directorList = response.data.crew.filter(
          (member) => member.job === "Director"
        );
        setDirectors(directorList.map((director) => director.name));

        const writerList = response.data.crew.filter(
          (member) => member.department === "Writing"
        );
        setWriters(writerList.map((writer) => writer.name));

        const topStars = response.data.cast.slice(0, 5);
        setStars(topStars.map((star) => star.name));
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
      fetchCredits();
    }
  }, [id, movie]);

  useEffect(() => {
    setGenre(formatGenre());
    setRating(formatRating());
  }, [movie]);

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
            <h2 data-testid="movie-title"> {movie.title}</h2>
            <p data-testid="movie-release-date">
              {formatDateToUTC(movie.release_date)}
            </p>
            <p data-testid="movie-runtime">{movie.runtime}</p>
            <p>Genre: {genre}</p>
            <p>Rating: {rating}</p>
            <p data-testid="movie-overview"> {movie.overview}</p>
            <p>Directors: {directors.join(", ")}</p>
            <p>Writers: {writers.join(", ")}</p>
            <p>Stars: {stars.join(", ")}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
