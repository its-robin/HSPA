import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Array<any> = [
    {
      Id: 1,
      Name: 'Robin House',
      Type: 'House',
      Price: 12000,
    },
    {
      Id: 2,
      Name: 'My New House',
      Type: 'House',
      Price: 12500,
    },
    {
      Id: 3,
      Name: 'ABC House',
      Type: 'House',
      Price: 13000,
    },
    {
      Id: 4,
      Name: 'Tent House',
      Type: 'House',
      Price: 11000,
    },
    {
      Id: 5,
      Name: 'Guest House',
      Type: 'House',
      Price: 10000,
    },
    {
      Id: 6,
      Name: 'Rest House',
      Type: 'House',
      Price: 14000,
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
