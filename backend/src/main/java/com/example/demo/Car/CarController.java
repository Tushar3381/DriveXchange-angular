package com.example.demo.Car;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService cs;

    private final Path uploadPath = Paths.get("uploads");

    // Save car 
    @PostMapping("/saveCarInfo")
    public ResponseEntity<Car> one(@RequestBody Car c1) {
        return cs.register(c1);
    }
              
    //Save car with image upload
    @PostMapping("/saveCarWithImage")
    public ResponseEntity<Car> saveCarWithImage(
 	        @RequestParam("id")    Long id,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("color") String color,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) throws IOException {
        return cs.saveCarWithImage(id,brand, model, color, price, description, image);
    }

    //Serve uploaded images so Angular can use them directly
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws MalformedURLException {
        Path filePath = uploadPath.resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // you can detect type dynamically
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    //Fetch all cars
    @GetMapping("/fetchcars")
    public List<Car> two() {
        return cs.getallCar();
    }

    //Get car by ID
   @GetMapping("/getCarbyId/{cid}")
   public Car three(@PathVariable Long cid) {
       return cs.getSingleCarbyId(cid);
   }

    //Delete car
    @DeleteMapping("/del/{cid}")
    public String four(@PathVariable String cid) {
        return cs.deldata(cid);
    }

//    //Update car
//    @PutMapping("/update/{cid}")
//    public ResponseEntity<Car> updateCar(@PathVariable Long cid, @RequestBody Car c1) {
//        return cs.updateCar(cid, c1);
//    }
//    

 // Update car with/without image
    @PutMapping("/update/{cid}")
    public ResponseEntity<Car> updateCar(
            @PathVariable Long cid,
            @RequestParam("car") String carJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            return cs.updateCarWithImage(cid, carJson, image);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    
    //Search by brand
    @GetMapping("/search/brand/{brand}")
    public List<Car> searchByBrand(@PathVariable String brand) {
        return cs.searchByBrand(brand);
    }

    //Search by model
    @GetMapping("/search/model/{model}")
    public List<Car> searchByModel(@PathVariable String model) {
        return cs.searchByModel(model);
    }
    
    @GetMapping("/car/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = cs.getSingleCarbyId(id);
        if (car == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(car);
    }

    
	@Override
	public String toString() {
		return "CarController [cs=" + cs + ", uploadPath=" + uploadPath + "]";
	}
    
    
    
}


