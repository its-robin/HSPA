
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { sequenceEqual } from 'rxjs';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
 SellRent =1;
  properties: Array<any> = [];

  constructor(private route: ActivatedRoute, private housingService : HousingService) {}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
    {
      this.SellRent=2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
         data=>{
        this.properties=data;

      }
    )
}
}
