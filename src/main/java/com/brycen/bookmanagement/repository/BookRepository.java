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
	
	@Query("select b from BookEntity b where b.bookname like %?1% and b.isDelete = false")
	Page<BookEntity> findByBooknameLike(String key,Pageable pageable);
	
	@Query("select b from BookEntity b where b.author like %?1% and b.isDelete = false")
	Page<BookEntity> findByAuthorLike(String key,Pageable pageable);
	
	@Query("select b from BookEntity b where b.isDelete = false")
	Page<BookEntity> findAll(Pageable pageable);
	
	@Query("select b from BookEntity b where b.id = ?1 and b.inventory > 0")
	BookEntity checkInventory(long id);
	
	@Modifying
	@Transactional
	@Query("update BookEntity b set b.inventory = b.inventory-1 where b.id = ?1")
	void minusInventory(long id);
	
	@Modifying
	@Transactional
	@Query("update BookEntity b set b.inventory = b.inventory+1 where b.id = ?1")
	void plusInventory(long id);
	
	
	@Query("select b from BookEntity b where b.bookname like %?1% and b.isDelete = false")
	List<BookEntity> searchBook(String key);
	
}
