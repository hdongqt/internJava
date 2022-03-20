package com.brycen.bookmanagement.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.annotations.Where;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.brycen.bookmanagement.entity.BookEntity;
import com.brycen.bookmanagement.entity.CategoryEntity;

public interface BookRepository extends JpaRepository<BookEntity, Long>{
	@Modifying
	@Transactional
	@Query("update BookEntity b set b.category =:cateNew where b.category=:cateOld")
    void updateCategoryOfBook(CategoryEntity cateOld, CategoryEntity cateNew);
	
	@Where(clause = "is_delete = false")
	List<BookEntity> findByBooknameLike(String key,Pageable pageable);
	
	@Query("select b from BookEntity b where b.category.name like %?1%")
	@Where(clause = "is_delete = false")
	List<BookEntity> findByCategoryNameLike(String key,Pageable pageable);
	
	@Where(clause = "is_delete = false")
	Page<BookEntity> findAll(Pageable pageable);
}
