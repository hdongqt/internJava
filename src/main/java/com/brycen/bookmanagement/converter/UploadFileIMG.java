package com.brycen.bookmanagement.converter;

import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.brycen.bookmanagement.exception.BookAPIException;
@Component
public class UploadFileIMG {
  private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

  public String upload(MultipartFile image) {
	  System.out.println(image.getOriginalFilename());
	  String[] names = image.getOriginalFilename().split("\\.");
	  String extension = names[names.length-1];
	  if(!(extension.toLowerCase().equals("jpg") || extension.toLowerCase().equals("png") ||
			  extension.toLowerCase().equals("gif") ||
			  extension.toLowerCase().equals("jpeg"))
			  ) throw new BookAPIException(HttpStatus.FAILED_DEPENDENCY, "Định dạng file ảnh không hợp lệ !");
	  try {
		    Path staticPath = Paths.get("static");
	        Path imagePath = Paths.get("images");
	        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
	            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
	        }
	        Path file = CURRENT_FOLDER.resolve(staticPath)
	                .resolve(imagePath).resolve(image.getOriginalFilename());
	         OutputStream os = Files.newOutputStream(file);
	         os.write(image.getBytes());
	         return imagePath.toString()+"/"+image.getOriginalFilename().toString();
		} catch (Exception e) {
			throw new BookAPIException(HttpStatus.BAD_REQUEST, "Không thể upload ảnh !");
	}
  }
}
