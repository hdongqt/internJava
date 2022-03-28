import React from 'react'
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
Modal.setAppElement('#root')
const customStyle =  {
  overlay: {
    backgroundColor: '#3440388f'
  },
  content: {
    top: '50%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: "16px"
  }
}


function HistoryModal({historyDetail,onCloseModal}) {
  const [isActive,setIsactive] = useState(false)
  useEffect(() => {
   historyDetail ? setIsactive(true) : setIsactive(false)
  }, [historyDetail])
  
  return (
      <Modal 
      isOpen={isActive}
      shouldCloseOnOverlayClick={false}
      onRequestClose={()=>setIsactive(false)}
      style={customStyle}
      >
        <div className="d-flex justify-content-between">
          <h2>Thông tin mượn sách</h2> 
        <button className='btn btn-dark' onClick={()=>{onCloseModal()}}>X</button>

        </div>
         <div className="modal-body">
            <div className="row">
              <div className="col-4">Danh sách:</div>
              <div className="col-8">
              <div class="card history-card square scrollbar-cyan bordered-cyan">
                   {
                     historyDetail && historyDetail.listbooks.map(item=>
                      <p>{`${item.bookname} - ${item.author}`}</p>
                      )
                   }
               </div>
              </div>
            </div>
            <div className="modal-group d-flex">
                  <span className='me-3 d-block'> Ngày mượn : {historyDetail && historyDetail.borrowDate}</span>
                  <span className='me-3 d-block'> Ngày hẹn trả : {historyDetail && historyDetail.appointmentDate}</span>
                  <span> Ngày trả : {historyDetail && historyDetail.returnDate}</span>
            </div>
           <div className="modal-group">
           <span className='me-3 d-block'> Người cho mượn : {historyDetail && historyDetail.createBy}</span>
           <span className='me-3 d-block'> Tình trạng : {historyDetail && historyDetail.status}</span>
           </div>
            <div className="modal-group">
              <div>Phạt : {historyDetail && historyDetail.fine} vnđ</div>
              <div>Ghi chú : {historyDetail && historyDetail.note}</div>
            </div>
            </div>
            <div className='d-flex justify-content-end'>
      <button className='btn btn-danger me-3' onClick={()=>{onCloseModal()}}>Xóa</button>
         <button className='btn btn-outline-primary' onClick={()=>{onCloseModal()}}>Quay lại</button>
      </div>
      </Modal>
  )
}

export default HistoryModal