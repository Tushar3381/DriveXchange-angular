package com.example.demo.SellCar;

public class SellCarRequest {

    private String brand;
    private String model;
    private String year;
    private String fuelType;
    private String price;
    private String ownerName;
 //   private String city;
   // private String state;
    private String contactNumber;

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

   // public String getCity() { return city; }
   // public void setCity(String city) { this.city = city; }

   // public String getState() { return state; }
   // public void setState(String state) { this.state = state; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
}
