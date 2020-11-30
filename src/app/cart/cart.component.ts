import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
  }

  removeFromCart(index: number):void {
    this.shopService.cartArray.splice(index,1);
    

  }

  clearCart(): void{
    this.shopService.cartArray = [];
    this.shopService.thankyou = true;

  }

  totalPrice(): number {
    let total: number = 0;
    for(let i=0; i < this.shopService.cartArray.length; i++){
      total += this.shopService.cartArray[i].price;
    }
    return total;
  }

}
