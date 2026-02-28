package com.example.demo.Car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.nio.file.*;



@Service
public class CarDao implements CarService {

	@Autowired
	CarRepo cr;
	
	// Save Car 
	@Override
	public ResponseEntity<Car> register(Car c1) {
		
		Car c=cr.save(c1);
		return ResponseEntity.ok(c);
	}
//------------------------------------------------------------
	// Get All Car
	@Override
	public List<Car> getallCar() {
		
		return cr.findAll();
	}
//---------------------------------
	 // Get Car by ID
	@Override
	public Car getSingleCarbyId(Long cid) {
		
		return cr.findById(cid).orElse(null);
	}

//------------------------------------------------------
	//	Delete Car by ID
	@Override
	 public String deldata(String cid) {
        Long carId = Long.parseLong(cid); // convert String to Long
        cr.deleteById(carId);
        return "Record Deleted";
    }
	
//------------------------------------------------------
	//  Update Car
    @Override
    public ResponseEntity<Car> updateCar(Long cid, Car c1) {
        Car existingCar = cr.findById(cid).orElse(null);
        if (existingCar == null) {
            return ResponseEntity.notFound().build();
        }
        existingCar.setBrand(c1.getBrand());
        existingCar.setModel(c1.getModel());
        existingCar.setColor(c1.getColor());
        existingCar.setPrice(c1.getPrice());
        existingCar.setImageUrl(c1.getImageUrl());

        Car updatedCar = cr.save(existingCar);
        return ResponseEntity.ok(updatedCar);
    }
  
//------------------------------------------------------    
    // Search by Brand
    @Override
    public List<Car> searchByBrand(String brand) {
        return cr.findByBrandContainingIgnoreCase(brand);
    }
    
//------------------------------------------------------   
    // Search by Model
    @Override
    public List<Car> searchByModel(String model) {
        return cr.findByModelContainingIgnoreCase(model);
    }
      
    

 //-------------------------------------------------------------------------------------
    
    @Override
    public ResponseEntity<Car> saveCarWithImage(Long id,String brand, String model, String color, double price,String description, MultipartFile image) {
        //save image to "uploads" folder
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path uploadPath = Paths.get("uploads");

        if (!Files.exists(uploadPath)) {
            try {
				Files.createDirectories(uploadPath);
			} catch (java.io.IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }

        Path filePath = uploadPath.resolve(fileName);
        try {
			Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (java.io.IOException e) {
			// Auto-generated catch block
			e.printStackTrace();
		}

        //create Car object
        Car car = new Car();
        car.setId(id);
        car.setBrand(brand);
        car.setModel(model);
        car.setColor(color);
        car.setPrice(price);
        car.setDescription(description);
        car.setImageUrl(fileName);  // store only filename in DB

        Car savedCar = cr.save(car);
        return ResponseEntity.ok(savedCar);
    }

//----------------------------------------------------------
@Override
public ResponseEntity<Car> updateCarWithImage(Long cid, String carJson, MultipartFile image) {
    try {
        // Convert JSON string to Car object
        ObjectMapper objectMapper = new ObjectMapper();
        Car updatedCar = objectMapper.readValue(carJson, Car.class);

        // Find existing car
        Car existingCar = cr.findById(cid).orElse(null);
        if (existingCar == null) {
            return ResponseEntity.notFound().build();
        }

        // Update normal fields
        existingCar.setBrand(updatedCar.getBrand());
        existingCar.setModel(updatedCar.getModel());
        existingCar.setColor(updatedCar.getColor());
        existingCar.setPrice(updatedCar.getPrice());
        existingCar.setDescription(updatedCar.getDescription());

        // If new image uploaded
        if (image != null && !image.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            existingCar.setImageUrl(fileName); // update image filename in DB
        }

        Car savedCar = cr.save(existingCar);
        return ResponseEntity.ok(savedCar);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).build();
    }
}
}

	
	
	
	
	
	
	
	
	
	
	
	
	
	


