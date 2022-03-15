package com.brycen.bookmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brycen.bookmanagement.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>{
	CategoryEntity findOneByCode(String code);
}
