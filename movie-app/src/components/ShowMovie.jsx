import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function ShowMovie({}) {
	const matchesHolder = localStorage.getItem('matchHolder');

	const API_KEY = `3774131603660110c024a22c82fb41fe`;
	const image_path = `https://image.tmdb.org/t/p/w342`;
	const get_movie_details = `https://api.themoviedb.org/3/movie/${matchesHolder}?api_key=${API_KEY}&language=en-US`;
	const [postMovieDetails, setPostMovieDetails] = useState([]);

	useEffect(() => {
		axios.get(get_movie_details).then((response) => {
			setPostMovieDetails([response.data]);
		});
	}, []);

	return (
		<>
			{postMovieDetails.map((movie) => {
				return (
					<div key={movie.id}>
						<Grid container>
							<Grid item md={4}>
								<img
									src={image_path + movie.poster_path}
									className="movie-details-poster"
								/>
							</Grid>
							<Grid item md={8}>
								<Typography color="fff" variant="h4">
									{movie.original_title}
								</Typography>
							</Grid>
						</Grid>
					</div>
				);
			})}
		</>
	);
}

export default ShowMovie;
