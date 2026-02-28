package com.example.demo.testdrive;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testdrive")
@CrossOrigin(origins = "http://localhost:4200")
public class TestDriveController {

    private final TestDriveService service;

    public TestDriveController(TestDriveService service) {
        this.service = service;
    }

    @PostMapping("/request")
    public TestDrive request(@RequestBody TestDrive drive) {
        return service.requestTestDrive(drive);
    }

    @GetMapping("/all")
    public List<TestDrive> getAll() {
        return service.getAllRequests();
    }

    @PutMapping("/update/{id}")
    public TestDrive update(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return service.updateStatus(id, status);
    }
}
