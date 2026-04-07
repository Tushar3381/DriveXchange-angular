package com.example.demo.webconfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {
    @Value("${app.uploads-dir:uploads}")
    private String uploadsDir;

    @Value("${app.car-uploads-dir:car-uploads}")
    private String carUploadsDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Admin car uploads
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + normalizeDirectory(uploadsDir));

        // User sell-car uploads Second Hand Car
        registry.addResourceHandler("/car-uploads/**")
                .addResourceLocations("file:" + normalizeDirectory(carUploadsDir));
        
   //      User Buy-New-Car (User See Admin Added Car)
//      registry.addResourceHandler("/uploads/**")
//     .addResourceLocations("file:uploads/");

    }

    private String normalizeDirectory(String value) {
        return value.endsWith("/") ? value : value + "/";
    }
}
