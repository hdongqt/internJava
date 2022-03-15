package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name= "books")
public class BookEntity extends BaseEntity {

	
	@NotBlank
	@Column(name = "bookname")
	@Size(max=150)
	private String bookname;
	
	@NotBlank
	@Column
	@Size(min=3,max=100)
	private String author;
	
	@Column(name = "image")
	private String image;
	
	@Column(name = "price")
	@NotEmpty(message = "Giá không được để trống")
	private Long price;
	
	@Column(name = "total")
	@NotEmpty(message = "Tổng số lượng không được để trống")
	private int total;

	@Column(name = "inventory")
	@NotEmpty(message = "Tồn kho không được để trống")
	private int inventory;

	
	@Column(name="create_date")
	private Date createDate;
	
	@Column(name="update_date")
	private Date updateDate;
	

	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private CategoryEntity category;
	
	@ManyToMany(mappedBy = "books")
	private List<BorrowEntity> details = new ArrayList<>();
}
