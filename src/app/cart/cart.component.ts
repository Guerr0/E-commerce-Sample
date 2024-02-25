import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CartService } from '../cart.service';
import { Product } from '../products';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items!: Product[];
  totalPrice!: number;

  private unsubscribeAll: Subject<void> = new Subject<void>();

  checkoutForm: FormGroup<any>
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.cartService.totalPrice$
      .pipe(startWith(this.cartService.totalPrice), takeUntil(this.unsubscribeAll))
      .subscribe(newTotalPrice => {
        this.totalPrice = newTotalPrice;

      });

    this.cartService.items$
      .pipe(startWith(this.cartService.items), takeUntil(this.unsubscribeAll))
      .subscribe(newItems => {
        this.items = newItems;
      });

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.cartService.clearCart();
    alert('Your order has been submitted');
    this.checkoutForm.reset();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
