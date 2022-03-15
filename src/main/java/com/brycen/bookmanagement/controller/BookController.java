package com.brycen.bookmanagement.controller;

import java.io.IOException;

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

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.service.BookService;

@RestController
public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping(value = "/api/books")
	public BookOutput showBook(@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		BookOutput result = new BookOutput();
		if(page !=null && limit !=null) {
			result.setPage(page);
			result.setListResult(bookService.findAll(PageRequest.of(page-1, limit)));
			result.setTotalPage((int)Math.ceil((double)(bookService.totalItem()) / limit));
		}else result.setListResult(bookService.findAll());
		return result;
	}

	@PostMapping(value = "/api/books")
	public ResponseEntity<BookDTO> createNew(@Valid @RequestBody BookDTO model) throws IOException {
		return new ResponseEntity<BookDTO>(bookService.save(model),HttpStatus.CREATED);
	}

	@GetMapping(value = "/api/books/{id}")
	public BookDTO getBookById(@PathVariable long id) {
		return bookService.getById(id);
	}
	@PutMapping(value= "/api/books/{id}")
	public BookDTO updateBook(@RequestBody BookDTO model,@PathVariable("id") long id) {
		model.setId(id);
		return bookService.save(model);
	} 
	@DeleteMapping(value="/api/books/{id}")
	public void deleteBook(@PathVariable long id) {
		bookService.delete(id);
	}
}
