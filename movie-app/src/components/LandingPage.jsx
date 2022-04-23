import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;
	const apiLink = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;

	const [popularMovies, setPopularMovies] = useState(null);

	useEffect(() => {
		axios.get(apiLink).then((response) => {
			setPopularMovies(response.data);
		});
	}, []);

	return (
		<>
			{popularMovies.results.map((movie) => {
				return <p key={movie.id}>{movie.original_title}</p>;
			})}
		</>
	);
}

export default LandingPage;
