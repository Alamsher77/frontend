import React, { useState } from "react";

const SearchAndFilter = ({allOrders}) => {
  const [query, setQuery] = useState("");
  const items = ["React", "JavaScript", "Node.js", "HTML", "CSS"];

  const filteredItems = allOrders?.filter((item) =>
    item?._id?.toLowerCase().includes(query.toLowerCase())
  );
  
console.log(filteredItems)
  return (
    <div className="flex flex-col justify-center m-2 items-center w-full">
      <input
      className="w-60 rounded ring-1 ring-green-500 px-3 outline-none"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((item, index) => (
         <li key={index}>{item?._id}</li>
      ))
          
        }
      </ul>
    </div>
  );
};

export default SearchAndFilter;
