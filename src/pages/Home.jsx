import { useState, useEffect } from "react";
import { fetchBooks, searchBooks, filterBooksByGenre } from "../services/api";
import BookCard from "../components/BookCard";
import loadingImg from "../assets/loading.gif";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("currentPage", currentPage);
    loadBooks();
  }, [currentPage]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks(currentPage);
      setBooks(data.results);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = books;
   
    setFilteredBooks(results);
  }, [ books]);

  const extractGenres = (books) => {
    console.log("books", books);
    const genreSet = new Set();
    books.forEach((book) => {
      book.subjects?.forEach((subject) => {
        // console.log("subject", subject);
        const trimmed = subject.trim();
        if (trimmed) {
          genreSet.add(trimmed);
        }
      });
    });
  };


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loadingImg} alt="Loading..." />
      </div>
    );
  }

  //   console.log("searchTerm", searchTerm);
  //   console.log("setSelectedGenre", selectedGenre);

  return (
    <>
      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p className="no-results">No books found matching your criteria.</p>
        ) : (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </>
  );
};

export default Home;
