package com.brycen.bookmanagement.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.CategoryDTO;
import com.brycen.bookmanagement.dto.request.TestRequest;
import com.brycen.bookmanagement.dto.response.CategoryOutput;
import com.brycen.bookmanagement.service.impl.CategoryServiceImpl;
import com.brycen.bookmanagement.service.impl.UploadService;

@RestController
public class CategoryController {

	@Autowired
	private CategoryServiceImpl categoryService;
	
	
//	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(value= "/api/categorys")
	public CategoryOutput showCategory() {
			CategoryOutput cate = new CategoryOutput();
			 cate.setListResult(categoryService.findAll());
			 return cate;
	}
	@PostMapping(value = "/api/categorys")
	public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO model) {
		return new ResponseEntity<CategoryDTO>(categoryService.save(model),HttpStatus.CREATED) ;
	}
	
	@GetMapping(value = "/api/categorys/{id}")
	 public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable  long id){
	      return new ResponseEntity<CategoryDTO>(categoryService.findById(id),HttpStatus.OK);
	}
	@PutMapping(value= "/api/categorys/{id}")
	public CategoryDTO updateCategory(@RequestBody CategoryDTO model,@PathVariable("id") long id) {
		model.setId(id);
		return categoryService.save(model);
	} 
	@DeleteMapping(value="/api/categorys/{id}")
	public void deleteCategory(@PathVariable long id) {
		categoryService.delete(id);
	}
	@Autowired
	private UploadService upload;
	
	@PostMapping(value="/api/test")
	public TestRequest upload(@ModelAttribute TestRequest test) throws IOException {
       return upload.uploadAnh(test);
	}
}
