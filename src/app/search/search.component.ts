import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pokename: string = "";
  url: string = "https://pokeapi.co/api/v2/"
  pokedata: any;
  poketypedata: any;
  tabSelect: number = 0;
  spritesArray: string[] = [];
  poketypeArray: string[] = [];
  pokeCounter: number = 0;
  shinyCounter: number = 0;

  constructor(public searchService: SearchService, public shopService: ShopService) { }

  ngOnInit(): void {
  }

  public click() {
    this.pokeCounter = 0;
    this.shinyCounter = 0;
    if(this.pokename){
      //Make the HTTP request and store the response 
      this.searchService.setSearch(this.url+"pokemon/"+this.pokename.toLowerCase());
      this.searchService.getSearch().subscribe( response => { 
        this.pokedata = response; 
        console.log(this.pokedata);

        //reset variables
        this.pokename = "";
        this.tabSelect = 1;
        this.spritesArray = [];
        this.poketypeArray = [];

        //add images to an array for ngFor directive
        for(const e in this.pokedata.sprites){
          if(typeof(this.pokedata.sprites[e]) === "string"){
            this.spritesArray.push(this.pokedata.sprites[e]);
          }
        }
          console.log(this.spritesArray);

    }, error => {console.log('oops', error); alert("No pokemon with that name found");});
      
    }
  }

  //generate price and send it to shop service to add to the cart
  buyPokemon(): void{
    let name: string = this.pokedata.forms[0].name;
    let price: number = this.pokedata.order*500+200;
    console.log(name,price);
    this.shopService.addPokemon(name,price);
    this.pokeCounter++;
    this.shopService.thankyou = false;

  }

  //same as buyPokemon() but for shiny pokemon
  buyShiny(): void {
    let name: string = "shiny " + this.pokedata.forms[0].name;
    let price: number = this.pokedata.order*2000+800;
    this.shopService.addPokemon(name,price);
    this.shinyCounter++;
    this.shopService.thankyou = false;
  }

  //For ngSwitch directive to display the right tab
  tabSelector(tabNumber: number): void {
    this.tabSelect = tabNumber;

  }

}
