import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
    setQuery("");
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
        className="weather-search-input"
      />
      <button
        onClick={handleSearch}
        className="weather-search-button"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
