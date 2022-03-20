package com.brycen.bookmanagement.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brycen.bookmanagement.dto.request.LoginRequest;
import com.brycen.bookmanagement.dto.request.SignupRequest;
import com.brycen.bookmanagement.dto.response.JwtResponse;
import com.brycen.bookmanagement.dto.response.MessageResponse;
import com.brycen.bookmanagement.entity.RoleEntity;
import com.brycen.bookmanagement.entity.UserEntity;
import com.brycen.bookmanagement.repository.RoleRepository;
import com.brycen.bookmanagement.repository.UserRepository;
import com.brycen.bookmanagement.security.jwt.JwtUtils;
import com.brycen.bookmanagement.security.service.UserDetailsImpl;
import com.brycen.bookmanagement.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Override
	public ResponseEntity<?> register(SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new MessageResponse("Error: Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new MessageResponse("Error: Email is already in use!"), HttpStatus.BAD_REQUEST);
		}

		// Create new user's account
		UserEntity user = new UserEntity(signUpRequest.getUsername(), signUpRequest.getEmail(), 
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getFullname(), 
				signUpRequest.getBirth(), signUpRequest.isSex(), signUpRequest.getAddress(),signUpRequest.getCmnd(),signUpRequest.getPhone());
		RoleEntity userRole = roleRepository.findByCode("ROLE_USER")
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		user.setRole(userRole);
		userRepository.save(user);

		return new ResponseEntity<>(new MessageResponse("User registered successfully!"), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> authenticate(LoginRequest loginRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());

			return ResponseEntity.ok(
					new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getFullname(), roles.get(0)));
		} catch (Exception e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
		
	}


	
}
