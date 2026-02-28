package com.example.demo.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
	
//	//USER REGISTER
//    ResponseEntity<User> register(User u1);
    
    //USER LOGIN
    ResponseEntity<?> login(String email, String password);
    
    //USER GET PROFILE
    ResponseEntity<User> getProfile(Long id);

    //USER UPDATE PROFILE
    ResponseEntity<User> updateProfile(User user);

    //User CAN CHANGE THE PASSWORD
    ResponseEntity<?>changePassword(Long id, String oldPassword, String newPassword);
    
    //USER REGISTER  	 	
    ResponseEntity<?> register(RegisterRequest request);

   

}
