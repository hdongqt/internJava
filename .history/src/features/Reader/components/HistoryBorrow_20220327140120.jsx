import { CategoryAPI } from 'api/CategoryAPI'
import { ReaderAPI } from 'api/ReaderAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryModal from './HistoryModal'

import { typeHistory } from 'utils/typeHistory'
import  Pagination from 'components/Pagination';

export const HistoryBorrow = () => {
    const [historys, setHistorys] = useState([])
    const [historyDetail, setHistoryDetail] = useState(null)
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        page: 1,
        limit: 5,
        type: "ALL"
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
    } 


    useEffect(() => {
    getHistory();
  }, [filters])

  const onCloseModal = ()=>{
      setHistoryDetail(null)
  }

  const getHistory = () => {
    ReaderAPI.getHistorys(filters).then((response) => {
     if(response.data){
         setHistorys(response.data.listResult)
         setPagination({
             ...pagination,
            page: response.data.page,
            totalPage :response.data.totalPage
        })
     }
    }).catch(error =>{
        console.log(error);
    })
}

const onDeleteHistory = (id) => {
    if(window.confirm("Xác nhận xóa ?")) {
        ReaderAPI.deleteHistory(id).then((response) =>{
            if(response.status == 200){
                alert("Xóa thành công");
                onCloseModal()
                getHistory();
            }
           }).catch(error =>{
               console.log(error.response)
               alert("Xóa không thành công !");
           })
    }
 }

  return (
      <>
    <div className = "container">
        <br/>
     <div className="filter">
     <select className="form-select mb-3 w-25" 
     aria-label=".form-select-lg example" onChange={(e)=>{setFilters({...filters,type: e.target.value})}}>
       {
         typeHistory.map(item=><option value={item.code}>{item.name}</option>)
       }
      </select>
     </div>
        <br/>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th> STT </th>
                    <th> Ngày mượn </th>
                    <th> Ngày hẹn trả </th>
                    <th>Tình trạng</th>
                    <th>Ngày trả</th>
                    <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                {
                       historys && historys.map(
                            (history,index) =>
                             <tr key = {history.id}> 
                              <td> {index+1}</td>
                              <td> {history.borrowDate}</td>
                                <td> {history.appointmentDate} </td>
                                <td> {history.status} </td>
                                <td> {history.returnDate} </td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>setHistoryDetail(history)}>Chi tiết</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination pagination={pagination}
            onPageChange={handelPageChange}
            />
        </div>
     {
    historyDetail && <HistoryModal 
    historyDetail={historyDetail} 
    onCloseModal={onCloseModal}
    onDeleteHistory ={onDeleteHistory}
    />
     }
        </>
         
  )
}
