import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CategoryAPI } from 'api/CategoryAPI';

export default function AddCategory() {
  const history =  useHistory()
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div>
    <br /><br />
    <div className = "container">
         <div className = "row">
             <div className = "card col-md-6 offset-md-3 offset-md-3">
             <h2 className = "text-center">{bookId ? "Cập nhật sách" : "Thêm sách"}</h2>
                 <div className = "card-body">
         <Form onSubmit={handelAddBook} ref={form}>
          {!successful && (
            <div>
             <div className="form-group">
                <label htmlFor="bookname">Tên sách(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bookname"
                  value={bookname}
                  onChange={(e)=>{setBookName(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Tác giả(*)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={(e)=>{setAuthor(e.target.value)}}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Giá(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e)=>{setPrice(e.target.value)}}
                  validations={[required,vnumber]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inventory">Tồn kho(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="inventory"
                  value={inventory}
                  onChange={(e)=>{setInventory(e.target.value)}}
                  validations={[required,vnumber]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="total">Tổng số lượng(*)</label>
                <Input
                  type="number"
                  className="form-control"
                  name="total"
                  value={total}
                  onChange={(e)=>{setTotal(e.target.value)}}
                  validations={[required,vnumber]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryCode">Thể loại(*)</label>
                <Select name='categoryCode' value={categoryCode} 
                validations={[required]} 
                className="form-control"
                onChange={(e)=>{setCategoryCode(e.target.value)}}
                >
                   {
                     listCategorySelect.map(item=>{
                       return  <option key={item.id} value={item.code}>{item.name}</option>
                     })
                   }
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="file">Hình ảnh</label>
                <Input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={(e)=>{setFile(e.target.files[0])}}
                />
              </div>
              <br/>
              <div className="form-group d-flex justify-content-end">
                <button className="btn btn-primary btn-block me-3">{bookId ? 'Cập nhật' :'Thêm sách'}</button>
                {
                 bookId &&   <div className="d-flex justify-content-end">
                          <span className="btn btn-danger btn-block me-3"
                          onClick={()=>{deleteOneBook(bookId)}}
                          >Xóa sách</span>
                          </div>
                  }
                <Link to="/book" className="btn btn-dark">Quay lại</Link>
              </div>
            </div>
          )}
      <br/>
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
 

                 </div>
             </div>
         </div>

    </div>

 </div>
  )
}
