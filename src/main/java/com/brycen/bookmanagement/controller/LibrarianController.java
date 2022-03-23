package com.brycen.bookmanagement.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.BorrowOutput;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.service.LibrarianService;

@RestController
public class LibrarianController {

	@Autowired
	private LibrarianService librarianService;
	
	@GetMapping(value = "/api/librarian/borrow")
	public  ResponseEntity<?> showBook(
			//username lay tu fe sau khi lua chon user da tim kiem
			@RequestParam(value = "username", required = false) String username,
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		return new ResponseEntity<BorrowOutput>(
				librarianService.getListBorrow(filter, username, PageRequest.of(page-1, limit)), HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/api/librarian/searchuser")
	public List<UserDTO> searchUser(
			@RequestParam(value = "fullname", required = false) String fullname){
		return librarianService.searchReader(fullname);
	}
	
	@DeleteMapping(value = "/api/librarian/borrow")
	public void deleteBorrow(@RequestBody long[] ids) {
		librarianService.delete(ids);
	}
	
		//xem chi tiết 
	@GetMapping(value = "/api/librarian/borrow/{id}")
	public BorrowDTO getOneBorrow(@PathVariable long id) {
		return librarianService.getOneBorrow(id);
	}
	@PostMapping(value="/api/librarian/borrow/create")
	public BorrowDTO createBorrow(@Valid @RequestBody BorrowCreateRequest brquest ) {
		return librarianService.createBorrow(brquest);
	}
	
	@PutMapping(value="/api/librarian/borrow/{id}")
	public BorrowDTO updateBorrow(@Valid @RequestBody BorrowUpdateRequest request,
			@PathVariable long id) {
				request.setId(id);
				return librarianService.updateBorrow(request);
	}
}
