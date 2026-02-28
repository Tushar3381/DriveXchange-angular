package com.example.demo.Car;

import jakarta.persistence.*;

@Entity
@Table(name = "admincar")
public class Car {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment in PostgreSQL
    private Long id;

    private String brand;
    private String model;
    private String color;
    private double price;
    private String description;

    @Column(name = "image_url")
    private String imageUrl;  
    
    
 // --- Getters and Setters ---
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	}

    
  

