const API_URL = 'https://gutendex.com/books';

export const fetchBooks = async (page = 1) => {
  const response = await fetch(`${API_URL}/?page=${page}`);

  if (!response.ok){
    throw new Error('Failed to fetch books')
  }

  return await response.json();
};
