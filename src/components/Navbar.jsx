import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">BookExplorer</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
