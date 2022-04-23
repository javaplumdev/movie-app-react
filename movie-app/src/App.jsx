import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ShowMovie from './components/ShowMovie';
import ShowResultsMovie from './components/ShowResultsMovies';

import axios from 'axios';

function App() {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const [matchHolder, setMatchHolder] = useState(null);
	const [searchMovies, setSearchMovies] = useState(null);
	const [searchHolder, setSearchHolder] = useState({ movieName: '' });

	function handleMatch(id) {
		setMatchHolder(id);
	}

	function handleSearch() {
		console.log(searchHolder.movieName);
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setSearchHolder(() => {
			return {
				[name]: value,
			};
		});
	}

	function getMovieRequest(movieSearch) {
		const search_movies_url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movieSearch}`;

		axios.get(search_movies_url).then((response) => {
			setSearchMovies(response.data.results);
		});
	}

	useEffect(() => {
		getMovieRequest(searchHolder.movieName);
	}, [searchHolder.movieName]);

	return (
		<Router>
			<div className="App">
				<Navbar
					handleSearch={handleSearch}
					handleChange={handleChange}
					searchHolder={searchHolder}
				/>
				<Routes>
					<Route path="/" element={<LandingPage handleMatch={handleMatch} />} />
					<Route
						path="/ShowMovie/:id"
						element={<ShowMovie matchHolder={matchHolder} />}
					/>
					<Route path="/ShowResultsMovie" element={<ShowResultsMovie />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
