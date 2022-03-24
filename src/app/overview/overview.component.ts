import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'chocolate-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  chocolates: { id: string; name: string; brand: string; currency: string; prices: { price: number; shop: string; link: string; unit: string; amount: number; }[]; nutrition: { fat: { total: number; saturated: number; }; carbohydrates: { total: number; sugar: number; }; protein: number; salt: number; }; }[] | undefined;
  selectedBrand: any;
  cheapestSupplier: string | undefined;
  cheapestSupplierLink: string | undefined;


  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.chocolates = this.dataService.getAllChocolateData()
  }

  public selectBrand(brand: any) {
    this.selectedBrand = brand;
  }

  public getAveragePrice(itemPrices: { price: number; shop: string; link: string; unit: string; amount: number; }[]) {
    let sum = 0.0;
    for (let itemPrice of itemPrices) {
      sum += itemPrice.price / (this.getPriceFactor(itemPrice.amount, itemPrice.unit));
    }
    return (sum / itemPrices.length).toFixed(2);
  }

  public getLowestPrice(itemPrices: { price: number; shop: string; link: string; unit: string; amount: number; }[]) {
    let minimumPrice = Number.MAX_VALUE;
    let computedPrice = 0.0;
    for (let i = 0; i < itemPrices.length; i++) {
      if (itemPrices[i].unit == "kg") {
        computedPrice = itemPrices[i].price / itemPrices[i].amount * 10;
        if (computedPrice < minimumPrice) {
          minimumPrice = computedPrice;
          this.cheapestSupplier = itemPrices[i].shop;
          this.cheapestSupplierLink = itemPrices[i].link;
        }
      }
      computedPrice = itemPrices[i].price * 100 / itemPrices[i].amount;
      if (computedPrice < minimumPrice) {
        minimumPrice = computedPrice;
        this.cheapestSupplier = itemPrices[i].shop;
        this.cheapestSupplierLink = itemPrices[i].link;
      }
    }
    return minimumPrice.toFixed(2);
  }

  private getPriceFactor(amount: number, unit: string) {
    let factor: number = 1;
    let converted_amount: number = 0;
    switch (unit) {
      case "kg":
        converted_amount = amount * 1000;
        factor = converted_amount / 100;
        break;
      case "hg":
        converted_amount = amount * 100;
        factor = converted_amount / 100;
        break;
      case "dag":
        converted_amount = amount * 10;
        factor = converted_amount / 100;
        break;
      case "g":
        factor = amount / 100;
        break;
      case "dg":
        converted_amount = amount * 0.1;
        factor = converted_amount / 100;
        break;
      case "cg":
        converted_amount = amount * 0.01;
        factor = converted_amount / 100;
        break;
      case "mg":
        converted_amount = amount * 0.001;
        factor = converted_amount / 100;
        break;
      default:
    }
    return factor;
  }

}
