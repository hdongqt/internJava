package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="roles")
@Getter
@Setter
public class RoleEntity {
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

	    @Column
		@NotBlank
		@Size(max = 50)
		private String name;
		
		@NotBlank
		@Size(max=50)
		@Column(name = "code",unique = true)
		private String code;
	  
		@OneToMany(mappedBy = "role")
		private List<UserEntity> users = new ArrayList<>();
}
