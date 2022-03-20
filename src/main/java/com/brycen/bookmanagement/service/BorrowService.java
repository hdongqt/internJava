package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;

public interface BorrowService {
	List<UserHistoryResponse> getListUserHistory(String username,String filter,Pageable pageable);
	int totalItem();
	List<BorrowDTO> getListBorrow(String filter,String username,Pageable pageable);
	BorrowDTO getOneBorrow(Long id);
	void delete(long[] ids);
	BorrowDTO createBorrow(BorrowCreateRequest borrowRequest);
	BorrowDTO updateBorrow(BorrowUpdateRequest borrow);
}
