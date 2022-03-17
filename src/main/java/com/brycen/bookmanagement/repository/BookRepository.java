package com.brycen.bookmanagement.repository;

import java.util.List;

import javax.transaction.Transactional;

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
	List<BookEntity> findByBooknameLike(String key,Pageable pageable);
	
	@Query("select b from BookEntity b where b.category.name like %?1%")
	List<BookEntity> findByCategoryNameLike(String key,Pageable pageable);
}
