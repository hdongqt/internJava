package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "categorys")
@SQLDelete(sql = "Update categorys set is_delete = true Where id = ?")
public class CategoryEntity extends BaseEntity{
 
	@Column
	@NotEmpty
	@Size(max = 50)
	private String name;
	
	@NotEmpty
	@Size(min=3,max=50)
	@Column(name = "code",unique = true)
	private String code;
	
	@Column
	@Size(max = 50)
	private String description;

	@OneToMany(mappedBy = "category",fetch = FetchType.EAGER)
	private List<BookEntity> books = new ArrayList<>();
	 
}
