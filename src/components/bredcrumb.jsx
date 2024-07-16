import {Link} from 'react-router-dom'
const Bredcrumb = (props)=>{
  return(
     <div className="text-sm p-2 text-slate-500 select-none border-y-2 border-slate-500"><Link to="/">Home</Link>/Product /{props.categry} /{props.name}</div> 
    )
}
export default Bredcrumb