import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const popular_movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;
	const [postPopularMovies, setPostPopularMovies] = useState(null);

	useEffect(() => {
		axios.get(popular_movies_url).then((response) => {
			setPostPopularMovies(response.data);
		});
	}, []);

	return (
		<>
			{postPopularMovies.results.map((movie) => {
				return <p key={movie.id}>{movie.original_title}</p>;
			})}
		</>
	);
}

export default LandingPage;
