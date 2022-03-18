package com.brycen.bookmanagement.converter;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.BorrowDTO;
import com.brycen.bookmanagement.dto.request.BorrowRequest;
import com.brycen.bookmanagement.dto.response.BorrowOutput;
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
			  response.setStatus(2);
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
	  public BorrowEntity mapBorrowCreateRequestToEntity(BorrowRequest borrowRequest) {
		  BorrowEntity entity = new BorrowEntity();
		  entity.setBooks(appConverter.mapList(borrowRequest.getListBorrow(), BookEntity.class));
		  entity.setAppointmentDate(borrowRequest.getAppointmentDate());
		  entity.setBorrowDate(borrowRequest.getBorrowDate());
		  entity.setCreateDate(new Date());
		  return entity;
	  }
}
