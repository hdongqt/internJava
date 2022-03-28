import { CategoryAPI } from 'api/CategoryAPI'
import { ReaderAPI } from 'api/ReaderAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HistoryModal from './HistoryModal'

import { typeHistory } from 'utils/typeHistory'

export const HistoryBorrow = () => {
    const [historys, setHistorys] = useState([])
    const [historyDetail, setHistoryDetail] = useState(null)
    const [pagination,setPagination] = useState({
        page: 1,
        limit: 5,
        totalPage : 1
    })
    const [filters,setFilters] = useState({
        type: "ALL",
        limit: 5,
        page: 1
    })
    const handelPageChange = (newPage) =>{
      setFilters({...filters, page: newPage})
    } 


    useEffect(() => {
    getHistory();
  }, [])

  const onCloseModal = ()=>{
      setHistoryDetail(null)
  }

  const getHistory = () => {
    ReaderAPI.getHistorys().then((response) => {
     if(response.data){
         setHistorys(response.data)
         console.log(response.data)
     }
    }).catch(error =>{
        console.log("sđs")
        console.log(error);
    })
}
console.log(filters)
  return (
      <>
    <div className = "container">
        <br/>
     <div className="filter">
     <select class="form-select mb-3" aria-label=".form-select-lg example" onChange={(e)=>{setFilters({...filters,type: e.target.value})}}>
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
        </div>
     {
      <HistoryModal historyDetail={historyDetail} onCloseModal={onCloseModal}/>
     }
        </>
         
  )
}
