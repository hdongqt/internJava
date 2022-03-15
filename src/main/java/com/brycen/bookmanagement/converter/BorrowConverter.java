package com.brycen.bookmanagement.converter;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.brycen.bookmanagement.dto.BookDTO;
import com.brycen.bookmanagement.dto.response.UserHistoryResponse;
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
}
