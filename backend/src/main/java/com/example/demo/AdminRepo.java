package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin,String>{
	
	Optional<Admin> findByAemail(String aemail);

	boolean existsByAemail(String aemail);
}


