package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:4200/")
public class AdminController {

	@Autowired
	AdminService as;
	
	@PostMapping("/saveAdminInfo")
	public ResponseEntity<Admin> one(@RequestBody Admin a1)
	{
		return as.register(a1);
	}
	
	@GetMapping("/fetchAdmin")
	public List<Admin> two()
	{
		return as.getallAdmins();
	}
	
	@DeleteMapping("/del/{aname}")
	public String three(@PathVariable String aname)
	{
		 String x=as.deldata(aname);
		 return x;
	}    
	
	@Autowired
	AdminServicee service;
	 @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody Map<String, String> request)
	 {
	        String token = service.login(request.get("aemail"), request.get("apass"));
	        return ResponseEntity.ok(Map.of("token", token));
	    }
	
	
	
	
	
}
