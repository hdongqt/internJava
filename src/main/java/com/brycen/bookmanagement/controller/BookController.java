package com.brycen.bookmanagement.controller;





import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

//import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.CategoryDTO;
import com.brycen.bookmanagement.dto.response.BookOutput;
import com.brycen.bookmanagement.service.BookService;

@RestController
public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping(value = "/api/books")
	public BookOutput showBook(
			@RequestParam(value = "key", required = false) String key,
			@RequestParam(value = "type", required = false) String type,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		    BookOutput result = new BookOutput();
			result.setPage(page);
			result.setListResult(bookService.findBook(key, type, PageRequest.of(page-1, limit)));
			result.setTotalPage((int)Math.ceil((double)(bookService.totalItem()) / limit));
		return result;
	}

	@PostMapping(value = "/api/books")
	public ResponseEntity<?> createNew(@Valid BookDTO model, BindingResult result){
		 if (result.hasErrors()) {
			 Map<String, String> errors = new HashMap<>();
			 result.getAllErrors().forEach((error)->{
		           errors.put("message", error.getDefaultMessage());
			 });
			 return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<BookDTO>(bookService.save(model),HttpStatus.CREATED);
	}

	@GetMapping(value = "/api/books/{id}")
	public BookDTO getBookById(@PathVariable long id) {
		return bookService.getById(id);
	}
//	@PutMapping(value= "/api/books/{id}")
//	public BookDTO updateBook(@RequestBody BookDTO model,@PathVariable("id") long id) {
//		model.setId(id);
//		return bookService.save(model);
//	} 
	@DeleteMapping(value="/api/books/{id}")
	public void deleteBook(long[] ids) {
		bookService.delete(ids);
	}
	
}
