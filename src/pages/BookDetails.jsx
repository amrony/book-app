import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../services/api";
import loadingImg from "../assets/loading.gif";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
        loadBook();
    }, [id]);

    const loadBook = async () => {
        try {
            setLoading(true);
            const bookData = await fetchBookById(id);
            setBook(bookData);
        } catch (error) {
            console.error("Error loading book:", error);
        } finally {
            setLoading(false);
        }
    };


    // console.log("Books::", book);

    if (loading) {
        return (
        <div
            className="loading"
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

    if (!book) {
        return <div className="error">Book not found</div>;
    }

    return (
        <div className="book-details">
            <div className="book-detail-container">
                <div className="book-cover">
                <img src={book.formats["image/jpeg"]} alt={book.title} />
                </div>
                <div className="book-info">
                    <h1>{book.title}</h1>
                    <p className="author">
                        {book.authors?.map((author) => author.name).join(", ") ||
                        "Unknown Author"}
                    </p>

                    <div className="details-section">
                        <h3>Summaries</h3>
                        <p>{book.summaries}</p>
                        <h3>About This Book</h3>
                        <div className="languages">
                        <strong>Languages:</strong>{" "}
                            {book.languages?.join(", ") || "Unknown"}
                        </div>
                        <div className="download-count">
                        <strong>Downloads:</strong> {book.download_count.toLocaleString()}
                        </div>
                    </div>

                    {
                        book.subjects?.length > 0 && (
                            <div className="details-section">
                                <h3>Subjects</h3>
                                <div className="subjects">
                                    {book.subjects.map((subject, index) => (
                                        <span key={index} className="subject-tag">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
