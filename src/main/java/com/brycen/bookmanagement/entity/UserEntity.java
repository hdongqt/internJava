package com.brycen.bookmanagement.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class UserEntity extends BaseEntity{

	  @NotBlank
	  @Size(min=3,max = 20)
	  private String username;

	  @NotBlank
	  @Size(max = 15)
	  private String CMND;
	  
	  @NotBlank
	  @Email
	  @Size(max= 100)
	  private String email;

	  @NotBlank
	  @Size(max = 120)
	  private String password;

	  @NotBlank
	  @Size(max = 50)
	  private String fullname;
	  @Column
	  @Type(type="date")
	  private Date birth;
	  @Column
	  private boolean sex;
	  @Column
	  @Size(max = 150)
	  private String address;

	  public UserEntity(String username, String email, String password, String fullname,Date birth,boolean sex,String address,String CMND) {
		this.username = username;
		this.CMND = CMND;
		this.email = email;
		this.password = password;
		this.fullname = fullname;
		this.birth = birth;
		this.sex = sex;
		this.address = address;
	}

	  @ManyToOne
	  @JoinColumn(name = "role_id")
	  private RoleEntity role;
	  
	  @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
	  private List<BorrowEntity> details = new ArrayList<BorrowEntity>();
}
