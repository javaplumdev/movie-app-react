import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

// Components
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ShowMovie from './components/ShowMovie';
import ShowResultsMovie from './components/ShowResultsMovies';
import ShowMovieDetails from './components/ShowMovieDetails';

function App() {
	const [matchHolder, setMatchHolder] = useState(null);
	const [searchHolder, setSearchHolder] = useState({ movieName: '' });

	function handleMatch(id) {
		setMatchHolder(id);
		console.log(id);
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
			<Navbar
				handleSearch={handleSearch}
				handleChange={handleChange}
				searchHolder={searchHolder}
				handleMatch={handleMatch}
			/>
			<Container>
				<div className="App">
					<Routes>
						<Route
							path="/"
							element={<LandingPage handleMatch={handleMatch} />}
						/>
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
			</Container>
		</Router>
	);
}

export default App;
