package com.brycen.bookmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.request.ChangePasswordRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryOutput;
import com.brycen.bookmanagement.security.SecurityUtils;
import com.brycen.bookmanagement.service.ReaderService;

@RestController
//@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('USER')")
public class ReaderController {
	  @Autowired 
	  private ReaderService readerService;

      
//	  @PreAuthorize("hasRole('READER')")
		@GetMapping(value= "/api/reader/info")
		public ResponseEntity<?> getInfo() {
				return new ResponseEntity<>(readerService.getInfo(),HttpStatus.OK);
		}
		//get history
		@GetMapping(value= "/api/reader/history")
		public ResponseEntity<?> getHistory(
				@RequestParam(value = "type" ,defaultValue = "ALL") String type,
				@RequestParam(value = "page" ,defaultValue = "1") Integer page,
				@RequestParam(value = "limit", defaultValue =  "5") Integer limit
				) {
			UserHistoryOutput result = readerService.getListUserHistory(SecurityUtils.getPrincipal().getUsername(),
					type,
					PageRequest.of(page-1, limit));
				return new ResponseEntity<>(result,HttpStatus.OK);
		}
		
		//update info 
		@PutMapping(value= "/api/reader/info")
		public ResponseEntity<?> updateInfo( @RequestBody UserDTO user){
			UserDTO d = readerService.save(user);
			return new ResponseEntity<>(d,HttpStatus.OK);
		}
		
		
		//delete history
		@DeleteMapping(value= "/api/reader")
		public void deleteHistory(@RequestBody long[] ids){
			 readerService.deleteHistory(ids);
		}
		
		//change password
		@PutMapping(value= "/api/reader/password")
		public int changePassword(@RequestBody ChangePasswordRequest password){
			return readerService.changePassword(password);
		}
		
		
}
