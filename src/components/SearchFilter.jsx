// import './SearchFilter.css';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre, 
  genres 
}) => {
  return (
    <div className="filters" style={{ justifyContent: 'space-between' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title..."
        style={{
          height: '20px',
          borderRadius: '5px',
          padding: '10px',
          width: '100%',
        }}
      />
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{
          // height: '0px',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <option value="">All Genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
