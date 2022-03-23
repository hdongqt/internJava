package com.brycen.bookmanagement.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.brycen.bookmanagement.entity.BorrowEntity;

public interface BorrowRespository extends JpaRepository<BorrowEntity, Long>{
	 //get all borrow of user
	 @Query("select b from BorrowEntity b where b.user.username = ?1 and b.isDelete = false")
	 Page<BorrowEntity> getByUsername(String username,Pageable pageable);
	 
	//get borrow paid or unpaid of  user 
	 @Query("select b from BorrowEntity b where b.user.username = ?1 and b.status = ?2 and b.isDelete = false")
	 Page<BorrowEntity> getHistoryBorrowUserPaidOrUnPaid(String username,boolean status,Pageable pageable);
	 
	 //get borrow  out date of  user 
	 @Query("select b from BorrowEntity b where b.user.username = ?1 "
	 		+ "and b.status = 0 and now() > b.appointmentDate and b.isDelete = false")
	 Page<BorrowEntity> getHistoryBorrowUserOutDate(String username,Pageable pageable);
	 
	 @Transactional
	 @Modifying
	 @Query("delete BorrowEntity b where b.user.id =?1 and b.id = ?2")
	 void deleteUserHistory(Long userId,Long id);
	 
	 //----------------librarian -----------------
	 //get all
	 @Query("select b from BorrowEntity b where b.user.role.code != 'ROLE_ADMIN' and b.user.role.code != 'ROLE_LIBRARIAN'")
	 Page<BorrowEntity> getAllListBorrow(Pageable pageable);
	 
	 // lấy danh sách chưa trả hoặc đã trả
	 @Query("select b from BorrowEntity b where b.status = ?2 and "
	 		+ "b.user.role.code != 'ROLE_ADMIN' and b.user.role.code != 'ROLE_LIBRARIAN'")
	 Page<BorrowEntity> getListBorrowPaidOrUnPaid(boolean status,Pageable pageable);
	 
	 
	 @Query("select b from BorrowEntity b where b.status = 0 and "
	 		+ "now() > b.appointmentDate and"
	 		+ " b.user.role.code != 'ROLE_ADMIN' and b.user.role.code != 'ROLE_LIBRARIAN'")
	 Page<BorrowEntity> getListBorrowOutDate(Pageable pageable);
	 
	 
	 
	 //librarian get all borrow of user
	 @Query("select b from BorrowEntity b where b.user.username = ?1")
	 Page<BorrowEntity> getBorrowOfUserForManager(String username,Pageable pageable);
	 
	//librarian get borrow paid or unpaid of  user 
	 @Query("select b from BorrowEntity b where b.user.username = ?1 and b.status = ?2")
	 Page<BorrowEntity> getHistoryBorrowUserPaidOrUnPaidForManager(String username,boolean status,Pageable pageable);
	 
	 //librarian get borrow  out date of  user 
	 @Query("select b from BorrowEntity b where b.user.username = ?1 and b.status = 0 and now() > b.appointmentDate")
	 Page<BorrowEntity> getHistoryBorrowUserOutDateForManager(String username,Pageable pageable);
}