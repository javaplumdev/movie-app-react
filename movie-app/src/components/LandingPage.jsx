import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper';

const imageStyle = {
	maxWidth: 200,
};

const breakPoints = {
	320: {
		slidesPerView: 2,
	},
	499: {
		slidesPerView: 3,
	},
	720: {
		slidesPerView: 4,
	},
	1020: {
		slidesPerView: 7,
	},
};

function LandingPage({ handleMatch }) {
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
			<h1>Popular Movies</h1>
			<Swiper
				pagination={{
					type: 'progressbar',
				}}
				spaceBetween={20}
				slidesPerView={1}
				modules={[Pagination]}
				className="mySwiper"
				breakpoints={breakPoints}
			>
				{postPopularMovies
					.filter((movie) => movie.poster_path)
					.map((movie) => {
						return (
							<SwiperSlide key={movie.id}>
								<div className="movie-holder">
									<img
										src={image_path + movie.poster_path}
										style={imageStyle}
									/>
									<p> {movie.original_title}</p>
									<Link to={`/ShowMovie/${movie.id}/${movie.original_title}`}>
										<button onClick={() => handleMatch(movie.id)}>
											More info
										</button>
									</Link>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</>
	);
}

export default LandingPage;
