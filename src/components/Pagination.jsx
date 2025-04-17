const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex gap-2 mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
