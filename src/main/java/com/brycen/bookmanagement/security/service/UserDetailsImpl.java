package com.brycen.bookmanagement.security.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.brycen.bookmanagement.entity.RoleEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;
	private String fullname;
	private String address;
	private String email;
	private boolean sex;
	private Date birth;
	private String cmnd;
	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String username, String fullname, String password,
			Date birth,String email,Boolean sex,String address,String cmnd,
			RoleEntity role) {
		this.id = id;
		this.username = username;
		this.fullname = fullname;
		this.address = address;
		this.birth = birth;
		this.password = password;
		this.cmnd = cmnd;
		this.sex = sex;
		this.email = email;
		this.authorities = mapRolesToAuthorities(role);
	}

	public static UserDetailsImpl build(UserEntity user) {
		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getFullname(), 
				user.getPassword(),user.getBirth(),user.getEmail(),user.isSex(),user.getAddress(),user.getCMND(),
			 user.getRole());
	}

	  private Collection< ? extends GrantedAuthority> mapRolesToAuthorities(RoleEntity role){
		  Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		  SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getCode());
		  authorities.add(authority);
	      return authorities;
	  }

	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}


	@Override
	public String getPassword() {
	    return this.password;
	}

	@Override
	public String getUsername() {
	    return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isSex() {
		return sex;
	}

	public void setSex(boolean sex) {
		this.sex = sex;
	}

	public Date getBirth() {
		return birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public String getCmnd() {
		return cmnd;
	}

	public void setCmnd(String cmnd) {
		this.cmnd = cmnd;
	}

	public void setId(Long id) {
		this.id = id;
	}




}
