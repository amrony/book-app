const API_URL = 'https://gutendex.com/books';

export const fetchBooks = async (page = 1) => {
  const response = await fetch(`${API_URL}/?page=${page}`);
  
  if (!response.ok){
    throw new Error('Failed to fetch books')
  }

  return await response.json();
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch book details')
  }

  return await response.json();
};

export const searchBooks = (books, searchTerm) => {
  if (!searchTerm) {
    return books
  }

  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterBooksByGenre = (books, genre) => {
  if (!genre) {
    return books
  }

  return books.filter(book => 
    book.subjects?.some(subject => 
      subject.toLowerCase().includes(genre.toLowerCase())
    )
  );
};
