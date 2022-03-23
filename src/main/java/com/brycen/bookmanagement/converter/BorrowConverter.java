package com.brycen.bookmanagement.converter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowCreateRequest;
import com.brycen.bookmanagement.dto.request.BorrowUpdateRequest;
import com.brycen.bookmanagement.dto.response.UserDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;
import com.brycen.bookmanagement.entity.BookEntity;
import com.brycen.bookmanagement.entity.BorrowEntity;

@Component
public class BorrowConverter {
	   @Autowired
	   private CustomConverter appConverter;
	   
	  public UserHistoryResponse mapEntityToHistoryResponse(BorrowEntity entity){
		  UserHistoryResponse response = appConverter.mapToDTO(entity, UserHistoryResponse.class);
		  if(entity.isStatus() == false &&  new Date().compareTo(entity.getAppointmentDate()) > 0){
			  response.setStatus("Trễ hạn");
		  }else if(entity.isStatus()) {
			  response.setStatus("Đã trả");
		  }else {
			  response.setStatus("Chưa trả");
		  }
		  response.setListbooks(appConverter.mapList(entity.getBooks(), BookDTO.class));
	      return response;
	   }
	  
	  
	  public BorrowDTO mapEntityToBorrowDTO(BorrowEntity entity){
		  BorrowDTO borrowDTO = appConverter.mapToDTO(entity, BorrowDTO.class);
		  if(entity.isStatus() == false &&  new Date().compareTo(entity.getAppointmentDate()) > 0){
			  borrowDTO.setStatus(2); //status 2 la qua han
		  }
		  borrowDTO.setListbooks(appConverter.mapList(entity.getBooks(), BookDTO.class));
		  borrowDTO.setUser(appConverter.mapToDTO(entity.getUser(), UserDTO.class));
	      return borrowDTO;
	   }
	  public BorrowEntity mapBorrowCreateRequestToEntity(BorrowCreateRequest borrowRequest) {
		  BorrowEntity entity = new BorrowEntity();
		  List<BookEntity> lists = new ArrayList<BookEntity>();
		  for (long id : borrowRequest.getIdBooks()) {
			  BookEntity b = new BookEntity();
			  b.setId(id);
			  lists.add(b);
		  }
		  entity.setBooks(lists);
		  entity.setAppointmentDate(borrowRequest.getAppointmentDate());
		  entity.setBorrowDate(borrowRequest.getBorrowDate());
//		  entity.setCreateDate(new Date());
		  return entity;
	  }
	  public BorrowEntity mapBorrowUpateRequestToEntity(BorrowUpdateRequest borrow,BorrowEntity entity) {
		  entity = appConverter.mapToEntity(borrow, entity);
		  List<BookEntity> lists = new ArrayList<BookEntity>();
		  for (long id : borrow.getIdBooks()) {
			  BookEntity b = new BookEntity();
			  b.setId(id);
			  lists.add(b);
		  }
		  entity.setBooks(lists);
		   if(borrow.getReturnDate() !=null) entity.setStatus(true); 
		return entity;
	  }
}
