package com.example.demo.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    public Order createOrder(Long userId, Long carId, double amount) {

        Order order = new Order();

        order.setUserId(userId);
        order.setCarId(carId);
        order.setAmount(amount);
        order.setOrderStatus("PENDING");

        return orderRepo.save(order);
    }

    public Payment makePayment(Long orderId, String mode, double amount) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Payment payment = new Payment();

        payment.setOrderId(orderId);
        payment.setPaymentMode(mode);
        payment.setAmount(amount);
        payment.setPaymentStatus("SUCCESS");

        order.setOrderStatus("COMPLETED");

        orderRepo.save(order);

        return paymentRepo.save(payment);
    }

}