	package com.brycen.bookmanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.converter.CategoryConverter;
import com.brycen.bookmanagement.dto.CategoryDTO;
import com.brycen.bookmanagement.entity.CategoryEntity;
import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.exception.ResourceNotFoundException;
import com.brycen.bookmanagement.repository.CategoryRepository;
import com.brycen.bookmanagement.service.BookService;
import com.brycen.bookmanagement.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private CategoryConverter categoryConverter;

	@Override
	public List<CategoryDTO> findAllPagination(Pageable pageable) {
		List<CategoryEntity> listEntity = categoryRepository.findAll(pageable).toList();
		List<CategoryDTO> listDTO = new ArrayList<CategoryDTO>();
		for (CategoryEntity entity : listEntity) {
			listDTO.add(categoryConverter.toDTO(entity));
		}
		return listDTO;
	}
	@Override
	public List<CategoryDTO> findAll() {
		List<CategoryEntity> listEntity = categoryRepository.findAll();
		List<CategoryDTO> listDTO = new ArrayList<CategoryDTO>();
		for (CategoryEntity entity : listEntity) {
			listDTO.add(categoryConverter.toDTO(entity));
		}
		return listDTO;
	}
	
	@Override
	public CategoryDTO save(CategoryDTO categoryDTO) {
		CategoryEntity categoryEntity  = new CategoryEntity();
		if(categoryDTO.getId() !=null) { //kiem tra update
			CategoryEntity oldCategoryEntity = categoryRepository.getById(categoryDTO.getId());
			CategoryEntity check = categoryRepository.checkExitsCategoryWhenUpdate(categoryDTO.getCode(),oldCategoryEntity.getId());
			if(check!=null) throw new BookAPIException(HttpStatus.BAD_REQUEST, "Category code existed");
			categoryEntity = categoryConverter.toEntity(categoryDTO, oldCategoryEntity);
		}else { //them moi
			CategoryEntity check = categoryRepository.findOneByCode(categoryDTO.getCode());
			if(check!=null) {
				 throw new BookAPIException(HttpStatus.BAD_REQUEST, "Category code existed");
			}
			categoryEntity = categoryConverter.toEntity(categoryDTO);
		}
		categoryEntity = categoryRepository.save(categoryEntity);
		return categoryConverter.toDTO(categoryEntity);
	}
	@Override
	public CategoryDTO findById(long id) {
		CategoryEntity categoryEntity = categoryRepository.findById(id).orElseThrow(() 
				-> new ResourceNotFoundException("Category", "id", id));
		return categoryConverter.toDTO(categoryEntity);
	}
	
	@Override
	public void delete(long id) {
		CategoryEntity cate = categoryRepository.findById(id).orElseThrow(()->
		 new ResourceNotFoundException("Category", "id", id));
		if(cate.getCode().equals("other")) {
			throw new BookAPIException(HttpStatus.BAD_REQUEST, "Category can't delete !");
		}
		bookService.updateWhenDeleteCategory(cate);
		categoryRepository.delete(cate);
	}
	@Override
	public CategoryDTO findOneByCode(String code) {
		CategoryEntity categoryEntity = categoryRepository.findOneByCode(code);
		return categoryConverter.toDTO(categoryEntity);
	}
	
	@Override
	public int totalItem() {
		return (int) categoryRepository.count();
	}

}
