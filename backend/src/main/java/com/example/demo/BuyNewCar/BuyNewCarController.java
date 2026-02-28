package com.example.demo.BuyNewCar;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Car.Car;

@RestController
@RequestMapping("/user/buy-new-car")
@CrossOrigin(origins = "http://localhost:4200")
public class BuyNewCarController{

    private final BuyNewCarService service;

    public BuyNewCarController(BuyNewCarService service) {
        this.service = service;
    }

    //  User sees all new cars
    @GetMapping
    public ResponseEntity<List<Car>> getAllNewCars() {
        return ResponseEntity.ok(service.getAllNewCars());
    }

    //  User sees car details
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarDetails(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCarDetails(id));
    }
}
