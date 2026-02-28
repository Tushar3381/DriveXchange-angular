package com.example.demo.testdrive;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TestDriveService {

    private final TestDriveRepo repo;

    public TestDriveService(TestDriveRepo repo) {
        this.repo = repo;
    }

    public TestDrive requestTestDrive(TestDrive drive) {
        return repo.save(drive);
    }

    public List<TestDrive> getAllRequests() {
        return repo.findAll();
    }

    public TestDrive updateStatus(Long id, String status) {
        TestDrive drive = repo.findById(id).orElseThrow();
        drive.setStatus(status);
        return repo.save(drive);
    }
}
