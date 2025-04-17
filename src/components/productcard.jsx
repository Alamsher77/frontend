import React from 'react'

const ProductCard = ({product})=>{

  return(
   <div className="border rounded-lg p-2 shadow hover:shadow-lg">
   <img src={product?.image[0]?.img} alt={product?.name} className="w-full h-22 object-cover" />
    <h3 className="font-semibold text-lg">{product?.name}</h3>
    <p className="text-gray-600">₹{product?.newPrice}</p>
    <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Add to Cart</button>
  </div>
    )
}

export default ProductCard