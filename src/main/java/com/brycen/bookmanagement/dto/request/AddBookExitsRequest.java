package com.brycen.bookmanagement.dto.request;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBookExitsRequest {
	@NotNull(message = "Chưa chọn sách cần thêm")
   private Long id;
   
   @NotNull(message = "Chưa chọn số lượng")
   private Integer total;
}
