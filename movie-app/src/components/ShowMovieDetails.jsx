import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShowMovieDetails({ matchHolder, searchHolder }) {
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
			{searchMovies.map((movie) => {
				if (matchHolder === movie.id) {
					return (
						<div key={movie.id}>
							<img src={image_path + movie.poster_path} alt="" />
							<p key={movie.id}>{movie.original_title}</p>
						</div>
					);
				}
			})}
		</>
	);
}

export default ShowMovieDetails;
