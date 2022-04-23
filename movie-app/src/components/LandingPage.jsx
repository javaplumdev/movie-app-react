import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function LandingPage({ handleMatch }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const popular_movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;
	const [postPopularMovies, setPostPopularMovies] = useState([]);

	useEffect(() => {
		axios.get(popular_movies_url).then((response) => {
			setPostPopularMovies(response.data.results);
		});
	}, []);

	return (
		<>
			<h1>Popular Movies</h1>
			{postPopularMovies.map((movie) => {
				return (
					<div key={movie.id} className="movie-holder">
						<p> {movie.original_title}</p>
						<Link to={`/ShowMovie/${movie.id}`}>
							<button onClick={() => handleMatch(movie.id)}>More info</button>
						</Link>
					</div>
				);
			})}
		</>
	);
}

export default LandingPage;
