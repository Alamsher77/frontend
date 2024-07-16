
const userlistlodding = ()=>{
  return(
    Array.from({length:10}).map((value,index)=>{
      return <tr className='loadding'> <td></td><td></td> <td></td></tr>
      })
  )
}
export default userlistlodding