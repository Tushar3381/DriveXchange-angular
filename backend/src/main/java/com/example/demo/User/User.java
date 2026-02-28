package com.example.demo.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name = "userslogin")
public class User
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
	private Long id;
	
	private String name;

	@Column(unique = true)
    private String email;

    private String password;
    
    private String contactnumber; 
    
    // Stores the path of the profile image on the server
    @Column(length = 1000) // increased length for file paths
    private String profileImage;
    
    @Column(name = "gender")
    private String gender;


    @Enumerated(EnumType.STRING)
   // private Role role;      // BUYER | SELLER | BOTH



	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	 public String getContactnumber() {
	        return contactnumber;
	    }

	    public void setContactnumber(String contactnumber) {
	        this.contactnumber = contactnumber;
	    }
	
	    public String getProfileImage() {
	        return profileImage;
	    }

	    public void setProfileImage(String profileImage) {
	        this.profileImage = profileImage;
	    }
	    
	    public String getGender() {
	        return gender;
	    }

	    public void setGender(String gender) {
	        this.gender = gender;
	    }

	    
	    
	    
	    
	    
	    
	    
}
