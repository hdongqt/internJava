package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Setter
@Getter
@Entity
@Table(name="borrows")
public class BorrowEntity extends BaseEntity{
	@Column
	private Date borrowDate;
	@Column
	private Date appointmentDate;
	@Column
	private Date returnDate;
	@Column
	private Long fine;
	@Column
	@Size(max=100)
	private String note;
	@Column
	private boolean status =Boolean.FALSE;
	
	@Column
	private Date createDate;
	@Column
	private Date updateDate;
	
	@Column
	@Size(max=20)
	private String createBy;
	
	@Column
	@Size(max=20)
	private String updateBy;
	

	@ManyToMany
    @JoinTable(name = "borrows_books",
        joinColumns = @JoinColumn(name = "detail_id"),
        inverseJoinColumns = @JoinColumn(name = "book_id")
    )
	  private List<BookEntity> books = new ArrayList<>();
	
	
	@ManyToOne
//	@JsonIgnore
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
