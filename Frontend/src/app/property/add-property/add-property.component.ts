import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
 //@ViewChild('Form') addpropertyForm : NgForm | undefined
 @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
addPropertyForm : FormGroup;
NextClicked: boolean;
 // WIll come from DB


 propertyTypes : Array<string> =['House','Apartment','Duplex']
 furnishTypes : Array<string> =['Fully','Semi','Unfurnished']
 propertyView : IProperty ={
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

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo : this.fb.group({
        SellRent:[null,Validators.required],
        pType:[null,Validators.required],
        Name:[null,Validators.required]}
      ),
      PriceInfo: this.fb.group({
        Price:[null,Validators.required],
        BuiltArea:[null,Validators.required]
      })

    }
    )
  }
  //------------//
  //Getter Methods//
  //------------//
 get BasicInfo()
  {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  get SellRent()
  {
    return this.BasicInfo.get('SellRent') as FormControl;
  }
  get Price()
  {
    return this.PriceInfo.get('Price') as FormControl;
  }
  get BHK() {
    return this.BasicInfo.get('BHK') as FormControl;
  }

  get PType() {
    return this.BasicInfo.get('PType') as FormControl;
  }

  get FType() {
    return this.BasicInfo.get('FType') as FormControl;
  }

  get Name() {
    return this.BasicInfo.get('Name') as FormControl;
  }

  get City() {
    return this.BasicInfo.get('City') as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.get('BuiltArea') as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.get('CarpetArea') as FormControl;
  }

  get Security() {
    return this.PriceInfo.get('Security') as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.get('Maintenance') as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.get('FloorNo') as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.get('TotalFloor') as FormControl;
  }

  get Address() {
    return this.AddressInfo.get('Address') as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.get('LandMark') as FormControl;
  }

  get RTM() {
    return this.OtherInfo.get('RTM') as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.get('PossessionOn') as FormControl;
  }

  get AOP() {
    return this.OtherInfo.get('AOP') as FormControl;
  }

  get Gated() {
    return this.OtherInfo.get('Gated') as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.get('MainEntrance') as FormControl;
  }

  get Description() {
    return this.OtherInfo.get('Description') as FormControl;
  }

  onBack()
  {
    this.router.navigate(['/']);
  }
  onSubmit()
  {
    this.NextClicked=true;
    if(this.BasicInfo.invalid){
      this.staticTabs.tabs[0].active = true;
      return;
    }
    if(this.PriceInfo.invalid){
      this.staticTabs.tabs[1].active = true;
      return;
    }

    console.log('Congrats , form submitted');
    console.log('Basicinfo: '+this.BasicInfo.invalid);

    console.log('SellRent='+this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
    console.log(this.SellRent);
  }
  selectTab(tabId: number, IsCurrentTabValid : boolean) {
    this.NextClicked=true;
    if(IsCurrentTabValid)
    {
      if (this.staticTabs?.tabs[tabId]) {
        this.staticTabs.tabs[tabId].active = true;
      }
    }

  }
}
