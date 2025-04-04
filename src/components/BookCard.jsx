import { Link } from 'react-router-dom';
import { toggleWishlistItem, isInWishlist } from '../services/wishlist';
import { useEffect, useState } from 'react';
// import './BookCard.css';

const BookCard = ({ book, onRemove, showRemoveButton = false }) => {

  // console.log("book card", book);
  const [inWishlist, setInWishlist] = useState(false);
  const coverImg = book.formats?.['image/jpeg'];
  
  const authors = book.authors?.map(author => author.name).join(', ') || 'Unknown Author';
  const genres = book.subjects?.slice(0, 3) || [];

  useEffect(() => {
    setInWishlist(isInWishlist(book.id));
  }, [book.id]);


  const handleWishlistClick = async(e) => {
    e.preventDefault();
    // console.log("Book", book);
    toggleWishlistItem(book);
    setInWishlist(isInWishlist(book.id));

    if (onRemove) {
      onRemove(book.id)
    };
  };

  console.log("inWishlist", inWishlist);


  return (
    
    
      <div className="book-card">
        <Link to={`/book/${book.id}`}>
          <div className="book-cover">
              <img src={coverImg ? coverImg : book.cover } alt={book.title} />
            <button 
              className="wishlist-btn" 
              onClick={handleWishlistClick}
            >
              <i 
                className="fas fa-heart"
                style={{ color: inWishlist ? 'red' : 'currentColor' }}
              ></i>
            </button>
          </div>
        </Link>
        <div className="book-info">
          <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
            <h3 className="book-title">{book.title}</h3>
          </Link>
          <p className="book-author">{authors}</p>
          <div className="book-genres">
            {genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          {showRemoveButton && (
            <button 
              className="remove-btn"
              onClick={(e) => {
                e.preventDefault();
                onRemove(book.id);
              }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
  );
};

export default BookCard;
