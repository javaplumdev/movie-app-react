import * as React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';

// Import Swiper styles
import 'swiper/css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { imageStyle, breakPoints } from './Styling';

function LandingPage({ handleMatch }) {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;
	const image_path = `https://image.tmdb.org/t/p/w342`;
	const popular_movies_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&include_video=true`;
	const trending_movies_url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
	const [postPopularMovies, setPostPopularMovies] = React.useState([]);

	React.useEffect(() => {
		axios.get(popular_movies_url).then((response) => {
			setPostPopularMovies(response.data.results);
		});
	}, []);

	return (
		<>
			<Typography variant="h5" color="white" style={{ marginTop: '1em' }}>
				Popular Movies
			</Typography>

			<Swiper slidesPerView={'auto'} breakpoints={breakPoints} spaceBetween={0}>
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
