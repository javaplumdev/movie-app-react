import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

import Box from '@mui/material/Box';

import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { imageStyle, breakPoints } from './Styling';
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';

function ShowMovie({ handleMatch, getLocalStorage }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;
	const image_path = `https://image.tmdb.org/t/p/w342`;
	const get_movie_details = `https://api.themoviedb.org/3/movie/${getLocalStorage}?api_key=${API_KEY}&language=en-US`;
	const upcoming_movies_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

	const [postMovieDetails, setPostMovieDetails] = useState([]);
	const [postUpcomingMovies, setPostUpcomingMovies] = useState([]);

	useEffect(() => {
		axios.get(get_movie_details).then((response) => {
			setPostMovieDetails([response.data]);
		});
		axios.get(upcoming_movies_url).then((response) => {
			setPostUpcomingMovies(response.data.results);
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

			<Typography
				variant="h5"
				color="white"
				style={{ marginTop: '.5em', marginBottom: '.5em' }}
			>
				Upcoming Movies
			</Typography>

			<Swiper breakpoints={breakPoints} spaceBetween={0}>
				{postUpcomingMovies
					.filter((movie) => movie.poster_path)
					.map((movie) => {
						return (
							<SwiperSlide key={movie.id}>
								<Link to={`/ShowMovie/${movie.id}/${movie.original_title}`}>
									<Box onClick={() => handleMatch(movie.id)}>
										<div className="movie-holder">
											<img
												src={image_path + movie.poster_path}
												style={imageStyle}
											/>
										</div>
									</Box>
								</Link>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</>
	);
}

export default ShowMovie;
