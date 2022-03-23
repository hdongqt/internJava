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
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;

import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name= "books")
@SQLDelete(sql = "Update books set is_delete = true Where id = ?")
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
	@NotNull
	private Long price;
	
	@Column(name = "total")
	@NotNull
	private int total;

	@Column(name = "inventory")
	@NotNull
	private int inventory;

	
	@Column(name="create_date")
	 @Type(type="date")
	private Date createDate;
	
	@Column(name="update_date")
	 @Type(type="date")
	private Date updateDate;
	

	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private CategoryEntity category;
	
	@ManyToMany(mappedBy = "books")
	private List<BorrowEntity> details = new ArrayList<>();
}
