import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../services/wishlist';
import BookCard from '../components/BookCard';
// import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  console.log("wishlist", wishlist);

  const handleRemove = (bookId) => {
    setWishlist(removeFromWishlist(bookId));
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <i className="far fa-heart"></i>
        <p>Your wishlist is empty</p>
        <Link to="/" className="btn">Browse Books</Link>
      </div>
    );
  }

  return (
    <>
      <h1>My Wishlist</h1>
      <div className="books-grid">
        {wishlist.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            onRemove={handleRemove}
            showRemoveButton
          />
        ))}
      </div>
    </>
  );
};

export default Wishlist;
