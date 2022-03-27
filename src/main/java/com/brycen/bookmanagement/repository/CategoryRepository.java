package com.brycen.bookmanagement.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brycen.bookmanagement.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>{
	CategoryEntity findOneByCode(String code);
	
	@Query("select c from CategoryEntity c where c.isDelete = false")
	List<CategoryEntity> findAll();
	
	@Query("select c from CategoryEntity c where c.isDelete = false")
	Page<CategoryEntity> findAll(Pageable pageable);
	
	@Query("select c from CategoryEntity c where c.code = ?1 and c.id != ?2")
	CategoryEntity checkExitsCategoryWhenUpdate(String code,Long id);
	
}
