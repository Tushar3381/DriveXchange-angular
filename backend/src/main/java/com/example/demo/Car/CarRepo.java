package com.example.demo.Car;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository<Car,Long> {

	 //Search by brand (case insensitive)
    List<Car> findByBrandContainingIgnoreCase(String brand);

    //Search by model (case insensitive)
    List<Car> findByModelContainingIgnoreCase(String model);
	
   
	
	
}
