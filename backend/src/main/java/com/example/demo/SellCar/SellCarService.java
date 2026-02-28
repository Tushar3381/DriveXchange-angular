package com.example.demo.SellCar;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.io.IOException;
import java.util.*;

@Service
public class SellCarService {

    private final SellCarRepo repo;

    // Folder where images will be stored
    private final Path uploadPath = Paths.get("car-uploads");

    // Allowed image formats
    private static final List<String> ALLOWED_FILE_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    public SellCarService(SellCarRepo repo) {
        this.repo = repo;

        // Ensure upload folder exists
        try {
            Files.createDirectories(uploadPath);
        } catch (Exception ignored) {}
    }

    // -------------------- Sell Car Submission --------------------

    public SellCar submitCar(SellCar car, List<MultipartFile> images) throws IOException {

        if (images != null && !images.isEmpty()) {
            List<String> filenames = new ArrayList<>();

            for (MultipartFile img : images) {

                // Validation: Only image formats allowed
                if (!ALLOWED_FILE_TYPES.contains(img.getContentType())) {
                    throw new IOException("Invalid file type: " + img.getOriginalFilename());
                }

                // Generate unique name to avoid overwriting
                String uniqueName = UUID.randomUUID() + "_" + img.getOriginalFilename();

                // Save file
                Files.copy(img.getInputStream(), uploadPath.resolve(uniqueName),
                        StandardCopyOption.REPLACE_EXISTING);

                filenames.add(uniqueName);
            }

            // Store filenames in DB separated by commas
            car.setImages(String.join(",", filenames));

        }

        car.setStatus("PENDING"); // Default on submission 

        return repo.save(car);
    }

    // -------------------- Fetching --------------------

    public List<SellCar> getPendingCars() {
        return repo.findByStatus("PENDING");
    }

    public List<SellCar> getApprovedCars() {
        return repo.findByStatus("APPROVED");
    }

    public SellCar getCarById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<SellCar> getAllCars() {
        return repo.findAll();
    }

    // -------------------- Admin Approval / Rejection --------------------

    public SellCar approve(Long id) {
        SellCar car = repo.findById(id).orElseThrow();
        car.setStatus("APPROVED");
        return repo.save(car);
    }

    public SellCar reject(Long id) {
        SellCar car = repo.findById(id).orElseThrow();
        car.setStatus("REJECTED");
        return repo.save(car);
    }

    // -------------------- Delete Car + Remove Files --------------------

    public void deleteCar(Long id) {
        SellCar car = repo.findById(id).orElse(null);

        if (car != null && car.getImages() != null) {
            for (String file : car.getImages().split(",")) {
                try {
                    Files.deleteIfExists(uploadPath.resolve(file));
                } catch (IOException ignored) {}
            }
        }

        repo.deleteById(id);
    }
    
    
    
    
    
    
    
    
    
    
    
}
