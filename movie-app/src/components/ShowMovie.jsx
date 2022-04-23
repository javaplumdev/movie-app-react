import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowMovie({ matchHolder }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const image_path = `https://image.tmdb.org/t/p/w342`;
	const popular_movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;
	const [postPopularMovies, setPostPopularMovies] = useState([]);

	useEffect(() => {
		axios.get(popular_movies_url).then((response) => {
			setPostPopularMovies(response.data.results);
		});
	}, []);

	return (
		<>
			{postPopularMovies.map((movie) => {
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

export default ShowMovie;
