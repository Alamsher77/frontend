import {Link} from 'react-router-dom'
import DisplayCurrency from '../../displayCurrancy'
const ProductIteam = (props)=>{
 const p = Number(props.oldPrice)
 const l = Number(props.newPrice)
 const m = 100 - (Math.floor(l / p * 100)) 
  return(
     <div key={props} className='min-w-[174px] max-w-[174px]'>
     <div className={`min-w-${props.width ?props.width:38} h-40 bg-pink-100 `}>
       <Link className="w-full h-full max-w-full max-h-full" to={`/product/${props.id}`}><img onClick={()=> window.scrollTo(0,0)} src={props?.image[0].img} className="w-full h-full object-contain mix-blend-multiply"  /></Link>
     </div>
      <div className="break-all p-0.5 mt-1 w-40">
        <p className="leading-4 tracking-tight text-sm truncate text-ellipsis">{props.name}</p>
       <p className="line-through text-slate-400">{DisplayCurrency(props.oldPrice)}</p>
       <strong className="text-red-600">{DisplayCurrency(props.newPrice)}</strong> <span className="text-green-600">-{m}%</span>
     
      </div>
     </div>
    )
}
export default ProductIteam