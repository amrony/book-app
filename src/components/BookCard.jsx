
const BookCard = ({ book, onRemove, showRemoveButton = false }) => {

  // console.log("book card", book);
  const coverImg = book.formats?.['image/jpeg'];
  
  const authors = book.authors?.map(author => author.name).join(', ') || 'Unknown Author';
  const genres = book.subjects?.slice(0, 3) || [];


  return (
    <div className="book-card">
      <div className="book-cover">
          <img src={coverImg ? coverImg : book.cover } alt={book.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
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
