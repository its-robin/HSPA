import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Iproperty } from '../Iproperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
 @ViewChild('Form') addpropertyForm : NgForm | undefined
 @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

 // WIll come from DB


 propertyTypes : Array<string> =['House','Apartment','Duplex']
 furnishTypes : Array<string> =['Fully','Semi','Unfurnished']
 propertyView : IPropertyBase ={
  Id:null,
  Name:'',
  Price:null,
  SellRent:null,
  PType:null,
  BHK:null,
  BuiltArea:null,
  City:null,
  RTM:null
 };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack()
  {
    this.router.navigate(['/']);
  }
  onSubmit()
  {
console.log('Congrats , form submitted')
console.log(this.addpropertyForm)
  }
  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
}
