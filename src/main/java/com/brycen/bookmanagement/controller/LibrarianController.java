package com.brycen.bookmanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.dto.response.BorrowOutput;
import com.brycen.bookmanagement.service.BorrowService;

@RestController
public class LibrarianController {

	@Autowired
	private BorrowService borrowService;
	
	@GetMapping(value = "/api/borrow")
	public BorrowOutput showBook(
			@RequestParam(value = "key", required = false) String key,
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		BorrowOutput borrows = new BorrowOutput();
	   	borrows.setPage(page);
	   	borrows.setListResult(borrowService.getListBorrow(filter, key , PageRequest.of(page-1, limit)));
	   	borrows.setTotalPage((int)Math.ceil((double)(borrowService.totalItem()) / limit));
		return borrows;
	}
}
