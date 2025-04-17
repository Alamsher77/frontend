import { useState,useContext} from "react";
import ProductCard from '../components/productcard' 
import FiltersSidebar from "../components/FiltersSidebar";
import SortBar from "../components/SortBar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
// import productsData from "../data/products";
import {ContestContext} from '../api/ContestContext'
const Shope = () => {
  const { allProduct} = useContext(ContestContext)
  
   
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("priceLowHigh");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter + Search + Sort
  let filtered = allProduct?.filter(p =>
    p?.name.toLowerCase().includes(search?.toLowerCase()) &&
    (!filters?.category || p?.category === filters?.category)
  );

  if (sortBy === "priceLowHigh") filtered?.sort((a, b) => a?.newPrice - b?.newPrice);
  else if (sortBy === "priceHighLow") filtered?.sort((a, b) => b?.newPrice - a?.newPrice);
  else if (sortBy === "rating") filtered?.sort((a, b) => b?.rating - a?.rating);

  const totalPages = Math.ceil(filtered?.length / productsPerPage);
  const displayed = filtered?.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
console.log(displayed)
  return (
    <div className="flex">
      <FiltersSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 p-4">
        <SearchBar setSearch={setSearch} />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayed?.map(product => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};
export default Shope;
