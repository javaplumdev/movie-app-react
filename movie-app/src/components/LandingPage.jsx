import * as React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

// Import Swiper styles
import 'swiper/css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { imageStyle, breakPoints, buttonStyling } from './Styling';

function LandingPage({ handleMatch }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const image_path = `https://image.tmdb.org/t/p/w342`;
	const popular_movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;
	const trending_movies_url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

	const [postPopularMovies, setPostPopularMovies] = React.useState([]);
	const [postTrendingMovies, setPostTrendingMovies] = React.useState([]);

	React.useEffect(() => {
		axios.get(popular_movies_url).then((response) => {
			setPostPopularMovies(response.data.results);
		});

		axios.get(trending_movies_url).then((response) => {
			setPostTrendingMovies(response.data.results);
		});
	}, []);
	const suggestions = postTrendingMovies.slice(18);

	return (
		<>
			<Typography variant="h5" color="#fff" style={{ marginTop: '1em' }}>
				Discover trending movies and series
			</Typography>
			<Grid container spacing={2} style={{ marginTop: '.5em' }}>
				<Grid item xs={12} md={8}>
					<Swiper
						spaceBetween={30}
						centeredSlides={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
						}}
						navigation={true}
						modules={[Autoplay]}
						className="mySwiper"
					>
						{postTrendingMovies
							.filter((movies) => movies.poster_path)
							.map((movie) => {
								return (
									<SwiperSlide key={movie.id}>
										<Grid container>
											<Grid item sm={6}>
												<div className="backdrop_path">
													<img src={image_path + movie.backdrop_path} />
												</div>
											</Grid>
											<Grid item sm={6}>
												<div className="movie-details">
													<div>
														<Typography variant="h5" color="#fff">
															{movie.original_title}
														</Typography>
														<Typography variant="caption" color="#fff">
															{movie.overview}
														</Typography>
													</div>
													<Link
														to={`/ShowMovie/${movie.id}/${movie.original_title}`}
														style={{ textDecoration: 'none' }}
													>
														<Button
															variant="contained"
															style={buttonStyling}
															onClick={() => handleMatch(movie.id)}
														>
															Watch
														</Button>
													</Link>
												</div>
											</Grid>
										</Grid>
									</SwiperSlide>
								);
							})}
					</Swiper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Grid container>
						<Grid item xs={12}>
							{suggestions.map((movie) => {
								return (
									<div key={movie.id} className="suggestions">
										<img src={image_path + movie.poster_path} />
										<div className="movie-details-suggestions">
											<Typography color="#fff">
												{movie.original_title}
											</Typography>
											<Link
												to={`/ShowMovie/${movie.id}/${movie.original_title}`}
												style={{ textDecoration: 'none' }}
											>
												<Button
													variant="contained"
													style={buttonStyling}
													onClick={() => handleMatch(movie.id)}
												>
													Watch
												</Button>
											</Link>
										</div>
									</div>
								);
							})}
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Typography
				variant="h5"
				color="white"
				style={{ marginTop: '.5em', marginBottom: '.5em' }}
			>
				Popular Movies
			</Typography>

			<Swiper breakpoints={breakPoints} spaceBetween={0}>
				{postPopularMovies
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

export default LandingPage;
