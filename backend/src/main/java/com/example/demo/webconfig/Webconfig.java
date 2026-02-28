package com.example.demo.webconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Webconfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Admin car uploads
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");

        // User sell-car uploads Second Hand Car
        registry.addResourceHandler("/car-uploads/**")
                .addResourceLocations("file:car-uploads/");
        
   //      User Buy-New-Car (User See Admin Added Car)
//      registry.addResourceHandler("/uploads/**")
//     .addResourceLocations("file:uploads/");

    }
}
