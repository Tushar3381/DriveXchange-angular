package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ManagerDao implements AdminService {

	
	@Autowired
	AdminRepo ar;
	
	
	@Override
	public ResponseEntity<Admin> register(Admin a1)
	{
		Admin a=ar.save(a1);
		return ResponseEntity.ok(a);
	}

	
	@Override
	public List<Admin> getallAdmins() 
	{
		return ar.findAll();
	}

	
	@Override
	public String deldata(String aname)
	{
		// TODO Auto-generated method stub
		ar.deleteById(aname);
		return "Record Delete";
	}

}
