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
				<button onClick={handleSearch}>Search</button>
			</div>
		</div>
	);
}

export default Navbar;
