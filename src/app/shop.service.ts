import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  cartArray: any[] = [];
  thankyou: boolean = false;

  constructor() { }

  addPokemon(name: string, price: number): void {
    let pokeObj = {"name": name, "price": price};
    this.cartArray.push(pokeObj);
    console.log(this.cartArray);

  }
}
