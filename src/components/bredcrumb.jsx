import {Link} from 'react-router-dom'
const Bredcrumb = (props)=>{
  console.log(props)
  return( 
      <div className="text-sm text-gray-500 mb-3 ">
        Home / Product / {props?.categry} / <span className="text-black font-semibold">{props?.name}</span>
      </div>
    )
}
export default Bredcrumb