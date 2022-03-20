package com.brycen.bookmanagement.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.bookmanagement.dto.AdminInfoUserDTO;
import com.brycen.bookmanagement.dto.response.AdminInfoUserOutput;
import com.brycen.bookmanagement.service.AdminService;

@RestController
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/api/admin/user")
	public AdminInfoUserOutput showListUser(
			@RequestParam(value = "role", required = false) String roleCode,
			@RequestParam(value = "fullname", required = false) String fullname,
			@RequestParam(value = "page" ,required = false) Integer page,
			@RequestParam(value = "limit", required = false) Integer limit) {
		      AdminInfoUserOutput result = new AdminInfoUserOutput();
					result.setPage(page);
					result.setListResult(adminService.showUser(roleCode, fullname, PageRequest.of(page-1, limit)));
					result.setTotalPage((int)Math.ceil((double)(adminService.totalItem()) / limit));
				return result;
	}
	
	@GetMapping(value="/api/admin/user/{id}")
	public AdminInfoUserDTO getUser(@PathVariable long id) {
		return adminService.getUserDetail(id);
	}

	
	@DeleteMapping(value="/api/admin/user/{id}")
	public void deleteCategory(@RequestBody long[] ids) {
		adminService.delete(ids);
	}
	
	@PutMapping(value="/api/admin/user/{id}")
	public AdminInfoUserDTO updateUser(@PathVariable long id,
			@RequestBody AdminInfoUserDTO request) {
		request.setId(id);
		return adminService.updateUser(request);
	}
}
