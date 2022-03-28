package com.brycen.bookmanagement.controller;





import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

//import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.request.AddBookExitsRequest;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.service.BookService;

@RestController

public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping(value = "/api/books")
	public ResponseEntity<BookOutput> showBook(
			@RequestParam(value = "key", required = false) String key,
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		return new ResponseEntity<BookOutput>(bookService.findBook(key, type, PageRequest.of(page-1, limit)), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('LIBRARIAN') or hasRole('ADMIN')")
	@PostMapping(value = "/api/books")
	public ResponseEntity<?> createNew(@Valid BookDTO model, BindingResult result){
		 if (result.hasErrors()) {
			 Map<String, String> errors = new HashMap<>();
			 result.getAllErrors().forEach((error)->{
				  String fieldName = ((FieldError)error).getField();
		           errors.put("message", fieldName +": "+  error.getDefaultMessage());
			 });
			 return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<BookDTO>(bookService.save(model),HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('LIBRARIAN') or hasRole('ADMIN')")
	@GetMapping(value = "/api/books/{id}")
	public BookDTO getBookById(@PathVariable long id) {
		return bookService.getById(id);
	}
	
	@PreAuthorize("hasRole('LIBRARIAN') or hasRole('ADMIN')")
	@PutMapping(value= "/api/books/{id}")
	public ResponseEntity<?> updateBook(@Valid BookDTO model,@PathVariable("id") long id,BindingResult result) {
		model.setId(id);
		return new ResponseEntity<BookDTO>(bookService.save(model),HttpStatus.OK);
	} 
	@PreAuthorize("hasRole('LIBRARIAN') or hasRole('ADMIN')")
	@DeleteMapping(value="/api/books")
	public void deleteBook(@RequestBody long[] ids) {
		bookService.delete(ids);
	}
	
	@GetMapping(value = "/api/books/search")
	public List<BookDTO> searchBooks(
			@RequestParam(value = "name", required = false) String name){
		return bookService.searchBook(name);
	}
	@PreAuthorize("hasRole('LIBRARIAN') or hasRole('ADMIN')")
	@PutMapping(value= "/api/books")
	public ResponseEntity<?> addBookExits(@Valid @RequestBody AddBookExitsRequest book) {
		bookService.addBookExits(book);
		return new ResponseEntity<>("Thêm sách thành công",HttpStatus.OK);
	} 
}
