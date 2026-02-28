package com.example.demo.SellCar;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SellCarRepo extends JpaRepository<SellCar, Long> {

	// Sell the car Admin Will Reject or Approve
    List<SellCar> findByStatus(String status);
    
   
}
