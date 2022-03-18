package com.brycen.bookmanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.dto.response.BorrowOutput;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.service.BorrowService;
import com.brycen.bookmanagement.service.ReaderService;

@RestController
public class LibrarianController {

	@Autowired
	private BorrowService borrowService;
	
	@Autowired
	private ReaderService readerService;
	
	@GetMapping(value = "/api/librarian/borrow")
	public BorrowOutput showBook(
			//username lay tu fe sau khi lua chon user da tim kiem
			@RequestParam(value = "username", required = false) String username,
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		BorrowOutput borrows = new BorrowOutput();
	   	borrows.setPage(page);
	   	borrows.setListResult(borrowService.getListBorrow(filter, username , PageRequest.of(page-1, limit)));
	   	borrows.setTotalPage((int)Math.ceil((double)(borrowService.totalItem()) / limit));
		return borrows;
	}
	
	
	@GetMapping(value = "/api/librarian/searchuser")
	public List<UserDTO> searchUser(
			@RequestParam(value = "fullname", required = false) String fullname){
		return readerService.searchReader(fullname);
	}
	
	@DeleteMapping(value = "/api/librarian/borrow")
	public void deleteBorrow(long[] ids) {
		borrowService.delete(ids);
	}
	
		//xem chi tiết 
	@GetMapping(value = "/api/librarian/borrow/{id}")
	public BorrowDTO getOneBorrow(@PathVariable long id) {
		return borrowService.getOneBorrow(id);
	}
}
