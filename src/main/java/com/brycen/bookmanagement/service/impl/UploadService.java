package com.brycen.bookmanagement.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.brycen.bookmanagement.converter.UploadFileIMG;
import com.brycen.bookmanagement.dto.request.TestRequest;

@Service
public class UploadService {
	@Autowired
	private UploadFileIMG uploadIMG;
  public TestRequest uploadAnh(TestRequest test) {
		MultipartFile image = test.getImage();
		 String t = uploadIMG.upload(image);
		 TestRequest d = new TestRequest();
		 d.setImageUploaded(t);
		 return d;
  }
}
