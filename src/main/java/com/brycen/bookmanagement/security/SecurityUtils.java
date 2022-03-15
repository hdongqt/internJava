package com.brycen.bookmanagement.security;

import org.springframework.security.core.context.SecurityContextHolder;

import com.brycen.bookmanagement.security.service.UserDetailsImpl;

public class SecurityUtils {
	  public static UserDetailsImpl getPrincipal() {
		  return (UserDetailsImpl) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
	    }
}
