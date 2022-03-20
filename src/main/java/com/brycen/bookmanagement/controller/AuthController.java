package com.brycen.bookmanagement.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.request.LoginRequest;
import com.brycen.bookmanagement.dto.request.SignupRequest;
import com.brycen.bookmanagement.repository.RoleRepository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.service.AuthService;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthController {


  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;
  
  @Autowired
  AuthService userService;



  @PostMapping("/auth/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
	 return userService.authenticate(loginRequest);
  }

  @PostMapping("/auth/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
   return userService.register(signUpRequest);
  }
}
