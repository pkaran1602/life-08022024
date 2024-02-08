
import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { MdOutlineSkipNext } from "react-icons/md";
import { MdOutlineSkipPrevious } from "react-icons/md";


const My_Pagination = (props) => {
  const { current_page , next_page ,prev_page,total_page,page_fun } = props

  let items = [];

  for(let number = 1; number<= total_page; number++){
    items.push(
      <Pagination.Item key={number} active={number === current_page} onClick={()=>page_fun(number)}>
      {number}
    </Pagination.Item>
    )
  }


  return (
    <div>
     <Pagination>
     <Pagination.Prev onClick={prev_page} disabled= {current_page <=1 }><MdOutlineSkipPrevious /></Pagination.Prev>
        {items}
        <Pagination.Next onClick={next_page} disabled= {current_page===total_page}><MdOutlineSkipNext /></Pagination.Next>
     </Pagination>
    </div>
  )
}

export default My_Pagination;
