const WISHLIST_KEY = 'bookWishlist';

export const getWishlist = () => {
  const wishlistJson = localStorage.getItem(WISHLIST_KEY);
  return wishlistJson ? JSON.parse(wishlistJson) : [];
};

export const isInWishlist = (bookId) => {
    const wishlistJson = localStorage.getItem(WISHLIST_KEY);
    const wishlist = wishlistJson ? JSON.parse(wishlistJson) : [];
    return wishlist.some(item => item.id === bookId);
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const toggleWishlistItem = (book) => {
  const wishlist = getWishlist();
  const existingIndex = wishlist.findIndex(item => item.id === book.id);
  
  if (existingIndex === -1) {
    wishlist.push({
      id: book.id,
      title: book.title,
      authors: book.authors,
      cover: book.formats['image/jpeg'] || null
    });
  } else {
    wishlist.splice(existingIndex, 1);
  }
  
  saveWishlist(wishlist);
  return wishlist;
};

export const removeFromWishlist = (bookId) => {
  const wishlist = getWishlist().filter(book => book.id !== bookId);
  saveWishlist(wishlist);
  return wishlist;
};

