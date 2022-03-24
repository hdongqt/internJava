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

import com.brycen.bookmanagement.dto.CategoryDTO;
import com.brycen.bookmanagement.dto.response.CategoryOutput;
import com.brycen.bookmanagement.entity.CategoryEntity;
import com.brycen.bookmanagement.repository.CategoryRepository;
import com.brycen.bookmanagement.service.CategoryService;

@RestController
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired CategoryRepository cate;
	
//	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping(value= "/api/categorys")
	public ResponseEntity<?> showCategory(
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		if(page!=null && limit !=null) {
			CategoryOutput cate = new CategoryOutput();
			cate.setPage(page);
			cate.setListResult(categoryService.findAllPagination(PageRequest.of(page-1, limit)));
			cate.setTotalPage((int)Math.ceil((double)(categoryService.totalItem()) / limit));
			 return new ResponseEntity<CategoryOutput>(cate, HttpStatus.OK);
		}
		return new ResponseEntity<List<CategoryDTO>>(categoryService.findAll(),HttpStatus.OK);
		
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
	
	@GetMapping(value= "/api/categorys/test/{id}")
	public CategoryEntity test(@PathVariable  long id) {
			 return cate.getById(id);
	}
	
}
