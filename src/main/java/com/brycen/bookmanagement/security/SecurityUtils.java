package com.brycen.bookmanagement.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.security.service.UserDetailsImpl;

public class SecurityUtils {
	  public static UserDetailsImpl getPrincipal() {
		  try {
	  			 UserDetailsImpl  currentUser = (UserDetailsImpl) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
	  			 return currentUser;
	  		} catch (Exception e) {
	  			throw new BookAPIException(HttpStatus.BAD_REQUEST, "User không hợp lệ !");
	  		}
	    }
	  
}
