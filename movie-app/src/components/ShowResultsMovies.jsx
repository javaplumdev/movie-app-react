import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowResultsMovie({ searchHolder, handleMatch }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;
	const image_path = `https://image.tmdb.org/t/p/w342`;
	const [searchMovies, setSearchMovies] = useState([]);

	function getMovieRequest(movieSearch) {
		const search_movies_url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movieSearch}`;

		axios.get(search_movies_url).then((response) => {
			setSearchMovies(response.data.results);
		});
	}

	useEffect(() => {
		getMovieRequest(searchHolder.movieName);
	}, [searchHolder.movieName]);

	return (
		<>
			{searchMovies.length > 0 ? (
				searchMovies.map((movie) => {
					return (
						<div key={movie.id} className="movie-results-holder">
							<img src={image_path + movie.poster_path} />
							<p>{movie.original_title}</p>
							<Link to={`/ShowResultsMovie/${movie.id}`}>
								<button onClick={() => handleMatch(movie.id)}>More info</button>
							</Link>
						</div>
					);
				})
			) : (
				<p>There are no results </p>
			)}
		</>
	);
}

export default ShowResultsMovie;

// searchMovies.map((movie) => {
// 	return (
// 		<div className="movie-results-holder">
// 			<img src={image_path + movie.poster_path} />
// 			<p>{movie.original_title}</p>

// 		</div>
// 	)
