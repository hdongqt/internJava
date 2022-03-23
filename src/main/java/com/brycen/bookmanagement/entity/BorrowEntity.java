package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="borrows")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "Update borrows set is_delete = true Where id = ?")
public class BorrowEntity extends BaseEntity{
	@Column
	@Type(type="date")
	private Date borrowDate;
	@Column
	 @Type(type="date")
	private Date appointmentDate;
	@Column
	 @Type(type="date")
	private Date returnDate;
	@Column
	private Long fine;
	@Column
	@Size(max=100)
	private String note;
	@Column
	private boolean status =Boolean.FALSE;
	
	@Column
	 @Type(type="date")
	@CreatedDate
	private Date createDate;
	@Column
	 @Type(type="date")
	@LastModifiedDate
	private Date updateDate;
	
	@Column
	@Size(max=20)
	@CreatedBy
	private String createBy;
	
	@Column
	@Size(max=20)
	@LastModifiedBy
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
