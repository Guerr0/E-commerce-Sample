import { Component, OnInit,Input,Output , EventEmitter } from '@angular/core';
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit {

  @Input() product!: Product;
  @Input() parola!: String;
  @Output() notify = new EventEmitter();

  

  constructor() { }

  ngOnInit(): void {
  }

}
