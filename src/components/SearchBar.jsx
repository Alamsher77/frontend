const SearchBar = ({ setSearch }) => (
  <input
    type="text"
    placeholder="Search products..."
    onChange={e => setSearch(e.target.value)}
    className="border px-3 py-1 rounded"
  />
);
export default SearchBar;
