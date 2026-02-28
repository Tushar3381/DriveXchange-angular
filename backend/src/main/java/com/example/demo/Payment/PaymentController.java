package com.example.demo.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public Order createOrder(@RequestParam Long userId,
                             @RequestParam Long carId,
                             @RequestParam double amount) {

        return paymentService.createOrder(userId, carId, amount);
    }

    @PostMapping("/pay")
    public Payment pay(@RequestParam Long orderId,
                       @RequestParam String mode,
                       @RequestParam double amount) {

        return paymentService.makePayment(orderId, mode, amount);
    }
}