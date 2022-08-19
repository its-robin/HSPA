import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyID : any;
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //console.log(this.route.snapshot.params);
    this.propertyID=+this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params) => {
        this.propertyID=+params['id'];
      }

    );
  }
  onSelectNext(){
    this.propertyID += 1;
    this.router.navigate(['property-detail'+ this.propertyID])
  }

}
