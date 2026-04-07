package com.example.demo.SellCar;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sellcar")
public class SellCarController {

    private final SellCarService service;

    public SellCarController(SellCarService service) {
        this.service = service;
    }
/*========= User Submit the car for sell =======*/
    @PostMapping(value = "/submit", consumes = "multipart/form-data")
    public ResponseEntity<String> submitCar(

            @RequestParam("ownerName") String ownerName,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") int year,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("price") double price,
            @RequestParam("description") String description,

            @RequestPart(value = "images", required = false) List<MultipartFile> images

    ) throws Exception {

        SellCar sellCar = new SellCar();

        sellCar.setOwnerName(ownerName);
        sellCar.setContactNumber(contactNumber);
        sellCar.setBrand(brand);
        sellCar.setModel(model);
        sellCar.setYear(year);
        sellCar.setFuelType(fuelType);
        sellCar.setPrice(price);
        sellCar.setDescription(description);

        service.submitCar(sellCar, images);

        return ResponseEntity.ok("Car submitted successfully. Please wait for admin approval.");
    }

    /* ================= ADMIN: Approve Car ================= */

    @PutMapping("/approve/{id}")
    public ResponseEntity<Map<String, String>> approveCar(@PathVariable Long id) {

        service.approve(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Car approved successfully");

        return ResponseEntity.ok(response);
    }

    /* ================= ADMIN: Reject Car ================= */

    @PutMapping("/reject/{id}")
    public ResponseEntity<Map<String, String>> rejectCar(@PathVariable Long id) {

        service.reject(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Car rejected successfully");

        return ResponseEntity.ok(response);
    }

    /* ================= ADMIN: Get Pending Cars ================= */

    @GetMapping("/pending")
    public ResponseEntity<List<SellCar>> getPendingCars() {
        return ResponseEntity.ok(service.getPendingCars());
    }
    /*----------------------------------------------------------*/
    @GetMapping("/all")
    public ResponseEntity<List<SellCar>> getAllCars() {
        return ResponseEntity.ok(service.getAllCars());
    }

//    Get Only Approve Second hand Car for the User to buy 
    @GetMapping("/approved")
    public ResponseEntity<List<SellCar>>getApprovedCars() {
        return ResponseEntity.ok(service.getApprovedCars());
    } 
    
    /* ============ USER: Get Single Car By ID ============ */

    @GetMapping("/{id}")
    public ResponseEntity<SellCar> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCarById(id));
    }

    
    
    
    
    
    
}

