const SortBar = ({ sortBy, setSortBy }) => (
  <div className="mb-4">
    <label>Sort by: </label>
    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
      <option value="priceLowHigh">Price: Low to High</option>
      <option value="priceHighLow">Price: High to Low</option>
      <option value="rating">Rating</option>
    </select>
  </div>
);
export default SortBar;
