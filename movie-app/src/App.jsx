import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ShowMovie from './components/ShowMovie';
import ShowResultsMovie from './components/ShowResultsMovies';
import ShowMovieDetails from './components/ShowMovieDetails';

function App() {
	const API_KEY = `3774131603660110c024a22c82fb41fe`;

	const [matchHolder, setMatchHolder] = useState(null);

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

	return (
		<Router>
			<div className="App">
				<Navbar
					handleSearch={handleSearch}
					handleChange={handleChange}
					searchHolder={searchHolder}
					handleMatch={handleMatch}
				/>
				<Routes>
					<Route path="/" element={<LandingPage handleMatch={handleMatch} />} />
					<Route
						path="/ShowMovie/:id/:title"
						element={<ShowMovie matchHolder={matchHolder} />}
					/>
					<Route
						path="/ShowResultsMovie"
						element={
							<ShowResultsMovie
								searchHolder={searchHolder}
								handleMatch={handleMatch}
							/>
						}
					/>
					<Route
						path="ShowMovieDetails/:id/:title"
						element={
							<ShowMovieDetails
								handleMatch={handleMatch}
								matchHolder={matchHolder}
								searchHolder={searchHolder}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
