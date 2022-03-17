package com.brycen.bookmanagement.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

import com.brycen.bookmanagement.exception.BookAPIException;
import com.brycen.bookmanagement.security.service.UserDetailsImpl;

public class SecurityUtils {
	
	  private static SecurityUtils instance;
      private static UserDetailsImpl currentUser;
      private SecurityUtils(){
  	    try {
  			 currentUser = (UserDetailsImpl) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
  		} catch (Exception e) {
  			throw new BookAPIException(HttpStatus.BAD_REQUEST, "User không hợp lệ !");
  		}
  	   }
	  public static UserDetailsImpl getPrincipal() {
		  if(instance == null) {
			  instance = new SecurityUtils();
		  }
		  return instance.currentUser;
	    }
	  
}
