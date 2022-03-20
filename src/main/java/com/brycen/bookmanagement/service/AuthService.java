package com.brycen.bookmanagement.service;

import org.springframework.http.ResponseEntity;

import com.brycen.bookmanagement.dto.request.LoginRequest;
import com.brycen.bookmanagement.dto.request.SignupRequest;

public interface AuthService {
	ResponseEntity<?> authenticate(LoginRequest loginRequest);
	ResponseEntity<?> register(SignupRequest signUpRequest);
}
