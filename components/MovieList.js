import React from 'react';

const MovieList = (props) => { 
	return (
		<div>
			{props.movies.map((movie, index) => (
				<div className='list'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						className='movie-list'
					>
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;