package com.brycen.bookmanagement.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class TestRequest {
 private String title;
 private MultipartFile image;
 private String imageUploaded;
}
