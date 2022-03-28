import React from 'react'

function Pagination(props) {
    const {pagination, onPageChange} = props;
    const {page, limit,totalPage} = pagination;
    console.log(page,totalPage)
    const handelPageChange = (newPage) =>{
        if(onPageChange) onPageChange(newPage)
    }

    const ListPagination = ({total},currentPage) => {
        console.log(total,"sdsd",totalPage)
     return <>{ [...Array(total)].map((item,index)=>
        <li className="page-item" style={{margin: "0px 5px"}}>
            <button className='btn btn-primary'
            onClick={()=>handelPageChange(index+1)}
            >{index+1}</button>
            </li>
        )
     }
     </>
    }
    
   return (
    <div className='d-flex justify-content-center'>
        <ul className='pagination'>
  <button
        disabled={page <=1}
        className="btn btn-primary"
        onClick={()=>handelPageChange(page-1)}
       >
        Prev
        </button>
       <ListPagination total={totalPage} />
    <button
        disabled={page >= totalPage}
        className="btn btn-primary"
        onClick={()=>handelPageChange(page+1)}
        >
        Next
        </button>
        </ul>
    </div>
  )
}

export default Pagination