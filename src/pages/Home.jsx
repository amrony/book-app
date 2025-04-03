import { useState, useEffect } from "react";
import { fetchBooks, searchBooks, filterBooksByGenre } from "../services/api";
import BookCard from "../components/BookCard";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import loadingImg from "../assets/loading.gif";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState(new Set());
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
      setFilteredBooks(data.results);
      setTotalPages(Math.ceil(data.count / 32));
      extractGenres(data.results);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = books;
    if (searchTerm) {
      results = searchBooks(results, searchTerm);
    }
    if (selectedGenre) {
      results = filterBooksByGenre(results, selectedGenre);
    }
    setFilteredBooks(results);
  }, [searchTerm, selectedGenre, books]);

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
    setGenres(genreSet);
  };

  //   console.log("Genres::", genres);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={Array.from(genres)}
      />

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <p className="no-results">No books found matching your criteria.</p>
        ) : (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
