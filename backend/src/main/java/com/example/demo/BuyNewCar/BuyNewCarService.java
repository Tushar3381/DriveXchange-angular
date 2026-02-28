package com.example.demo.BuyNewCar;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Car.Car;
import com.example.demo.Car.CarRepo;

@Service
public class BuyNewCarService {
	private final CarRepo carRepository;

    public BuyNewCarService(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    // Show all new cars to user
    public List<Car> getAllNewCars() {
        return carRepository.findAll();
    }

    // Show single car details
    public Car getCarDetails(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));
    }
}