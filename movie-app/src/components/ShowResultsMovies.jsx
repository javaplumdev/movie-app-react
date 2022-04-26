import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { imageStyle } from './Styling';

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
			<Typography variant="h5" className="results-title" color="white">
				There are {searchMovies.length} results in search{' '}
				{searchHolder.movieName}
			</Typography>
			<div className="show-results-movies">
				{searchMovies.length > 0 ? (
					searchMovies.map((movie) => {
						return (
							<>
								<Link
									to={`/ShowMovieDetails/${movie.id}/${movie.title}`}
									key={movie.id}
								>
									<div
										className="movie-results-holder"
										onClick={() => handleMatch(movie.id)}
									>
										<img
											src={image_path + movie.poster_path}
											style={imageStyle}
										/>
									</div>
								</Link>
							</>
						);
					})
				) : (
					<p>There are no results </p>
				)}
			</div>
		</>
	);
}

export default ShowResultsMovie;
