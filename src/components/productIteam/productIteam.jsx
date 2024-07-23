import {Link} from 'react-router-dom'
const ProductIteam = (props)=>{
 const p = Number(props.oldPrice)
 const l = Number(props.newPrice)
 const m = 100 - (Math.floor(l / p * 100)) 
  return(
     <div key={props} className='p-1 m-2 shadow-3xl '>
     <div className="w-full h-40 ">
       <Link to={`/product/${props.id}`}><img onClick={()=> window.scrollTo(0,0)} src={props?.image[0]} className="w-full h-full object-cover"  /></Link>
     </div>
      <div className="break-all mt-1 ">
        <p className="leading-4 tracking-tight text-sm truncate text-ellipsis">{props.name}</p>
       <p className="line-through text-red-400">₹{props.oldPrice}</p>
       <strong>₹{props.newPrice}</strong> <span className="text-green-600">-{m}%</span>
     
      </div>
     </div>
    )
}
export default ProductIteam