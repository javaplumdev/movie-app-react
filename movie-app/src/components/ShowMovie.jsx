import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

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
					<div key={movie.id} className="show-movie">
						<Grid container>
							<Grid item sm={3} style={{ textAlign: 'center' }}>
								<img
									src={image_path + movie.poster_path}
									className="movie-details-poster"
								/>
							</Grid>
							<Grid item sm={8} style={{ padding: '1em' }}>
								<Typography color="#fff" variant="h3">
									{movie.original_title}
								</Typography>
								{movie.genres.map((genre) => {
									return (
										<Typography
											color="#fff"
											variant="caption"
											style={{ margin: '0 .5em' }}
										>
											{genre.name}
										</Typography>
									);
								})}
								<Typography color="#fff" variant="h6">
									<div className="movie-ratings">
										<StarIcon />
										{movie.vote_average}
										<Typography style={{ marginLeft: '.5em' }}>
											Vote Average
										</Typography>
									</div>
								</Typography>
								<Typography color="#fff" variant="h5">
									{' '}
									Overview{' '}
								</Typography>
								<Typography color="#fff"> {movie.overview}</Typography>
							</Grid>
						</Grid>
					</div>
				);
			})}
		</>
	);
}

export default ShowMovie;
