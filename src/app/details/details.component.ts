import { Component, OnInit, Input } from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'chocolate-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() chocolateItem: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getChocolateBrand();
  }

  getChocolateBrand(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chocolateItem = this.dataService.getChocolateBrand(id);
  }

  goBack(): void {
    this.location.back();
  }

}
