import React, { useEffect, useState } from 'react'
import { BookAPI } from 'api/BookAPI'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
export default function Home() {

  const [books, setBooks] = useState([])
  const [pagination,setPagination] = useState({
      page: 1,
      limit: 5,
      totalPage : 1
  })
  const [filters,setFilters] = useState({
      page: 1,
      limit: 5,
      type: "BOOKNAME",
      key: ""
  })
  const handelPageChange = (newPage) =>{
    setFilters({...filters, page: newPage})
    getListBook()
  } 

  useEffect(() => {
          getListBook();
  }, [])
const getListBook = () => {
  BookAPI.getAllBooks(filters).then((response) => {
   if(response.data.listResult){
   let list = response.data.listResult;
     setBooks(list.map(item=>{
      return {
          ...item, select: false
      }
  }))
     setPagination({
         page: response.data.page,
         limit: 1,
         totalPage :response.data.totalPage
     })
  }
}).catch(error =>{
  console.log(error);
})
}

  return (
    <div className='container'>
     <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark mt-5">
       <div className="row">
        <div className="col-md-8 px-0">
          <h4 className="display-4 font-italic">Robertson Davies</h4>
          <p className="lead my-3">Một cuốn sách thực sự hay nên đọc trong tuổi trẻ, rồi đọc lại khi đã trưởng thành, và một nửa lúc tuổi già, giống như một tòa nhà đẹp nên được chiêm ngưỡng trong ánh bình minh, nắng trưa và ánh trăng</p>
        </div>
        <div className="col-md-4">
       <div className="d-flex justify-content-end">
       <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
       </div>
        </div>
        </div>
      </div>
      <div className="row mb-2 mt-5">
        <div className="search">
            <input type="search" id="form1" className="form-control" 
             onChange={(e)=>{setFilters({...filters,key: e.target.value,page:1})}}
             onKeyDown={(e)=>{if(e.keyCode == 13){
                 getListBook()
             }}}
            />
        <button type="button" className="btn btn-primary"
        onClick={(e)=>{getListBook()}}
        >
            Tìm kiếm
        </button>
        </div>
        </div>
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
          <div className="col-md-6">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img src="https://cafeandbooks.files.wordpress.com/2015/07/dscn4570.jpg" alt="anh"
            className="card-img-right flex-auto d-none d-lg-block"
            style={{width: "200px",height: "250px",objectFit: "cover"}}
            />
            {/* <img className="card-img-right flex-auto d-none d-lg-block" 
            data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" 
            style="width: 200px; height: 250px;"
             src="" data-holder-rendered="true"></img> */}
          </div>
        </div>
      </div>
    </div>
  )
}
