import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyNewCarService } from '../../service/buy-new-car-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from '../../service/payment-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class PaymentComponent implements OnInit {

  car: any;

  constructor(
    private route: ActivatedRoute,
    private carService: BuyNewCarService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.carService.getCarById(id).subscribe(data => {
      this.car = data;
    });
  }

  startPayment() {

    // Get user object from localStorage
    const userData = localStorage.getItem('user');

    if (!userData) {
      alert("User not logged in!");
      return;
    }

    // Parse user object
    const user = JSON.parse(userData);
    const userId = user.id;

    this.paymentService.createOrder(userId, this.car.id, this.car.price)
      .subscribe((order: any) => {

        alert("Order Created Successfully!");

        this.paymentService.makePayment(order.id, 'ONLINE', order.amount)
          .subscribe((res: any) => {
            alert("Payment Successful!");
          });

      });

  }

}
