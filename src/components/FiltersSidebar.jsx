import { useState,useContext} from "react";
import {ContestContext} from '../api/ContestContext'
const FiltersSidebar = ({ filters, setFilters }) => {
   const { allProductsCategry} = useContext(ContestContext)
    
  return (
    <div className="p-4 border-r w-64">
      <h2 className="font-bold mb-2">Filters</h2>
      {/* Category Filter */}
      <div>
        <label>Category:</label>
        <select onChange={e => setFilters({ ...filters, category: e.target.value })}>
           <option value="">All</option>
            {
              allProductsCategry?.length != 0 &&
              allProductsCategry?.map((category,index)=>{
                return(
                   <option value={category?.categry}>{category?.categry}</option>
          
                )
              })
              
              
            }
        </select>
      </div>
      {/* Add more filters like price, brand, etc. */}
    </div>
  );
};
export default FiltersSidebar;
