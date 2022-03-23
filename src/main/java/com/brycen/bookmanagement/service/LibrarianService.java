package com.brycen.bookmanagement.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;

public interface LibrarianService {

	List<BorrowDTO> getListBorrow(String filter, String username, Pageable pageable);

	int totalItem();

	BorrowDTO getOneBorrow(Long id);

	void delete(long[] ids);

	BorrowDTO createBorrow(BorrowCreateRequest borrowRequest);

	BorrowDTO updateBorrow(BorrowUpdateRequest borrow);

	List<UserDTO> searchReader(String fullname);
	
	boolean checkInventoryBook(long id);
}
