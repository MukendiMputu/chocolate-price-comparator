import { Injectable } from '@angular/core';
import {chocolateData} from "./chocolate-data";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getAllChocolateData() {
    return chocolateData.data;
  }

  public getChocolateBrand(id: number) {
    return chocolateData.data[id];
  }
}
