import { Link } from 'react-router-dom';

function Navbar({ handleSearch, handleChange, searchHolder }) {
	return (
		<div className="navbar">
			<Link to="/">
				<p>Navbar</p>
			</Link>
			<div className="inputs">
				<input
					type="text"
					onChange={handleChange}
					name="movieName"
					value={searchHolder.movieName}
				/>
				<Link to="/ShowResultsMovie">
					<button onClick={handleSearch}>Search</button>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
