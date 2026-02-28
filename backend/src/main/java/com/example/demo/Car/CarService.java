package com.example.demo.Car;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.io.IOException;

public interface CarService  
{
  public ResponseEntity<Car> register(Car c1);
  
  
  public ResponseEntity<Car> saveCarWithImage(Long id,String brand, String model, String color, double price,String description, MultipartFile image) throws IOException;

  
  public List<Car> getallCar();
  
  
  public Car getSingleCarbyId(Long cid);
  
  
  public String deldata(String cid);
  
  
  public ResponseEntity<Car> updateCar(Long cid, Car c1);

 
  public List<Car> searchByBrand(String brand);

 
  public List<Car> searchByModel(String model);
  
 
  public ResponseEntity<Car> updateCarWithImage(Long cid, String carJson,
                                                MultipartFile image) throws java.io.IOException;




  
}
