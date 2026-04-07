package com.example.demo;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface AdminService {
	
	public ResponseEntity<?> register(AdminRegistrationRequest request);
	
	public List<Admin> getallAdmins();
	
	public String deldata(String aname);

}
