import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { esLocale } from 'ngx-bootstrap/chronos';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';


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
property = new Property();
 // WIll come from DB


 propertyTypes : Array<string> =['House','Apartment','Duplex']
 furnishTypes : Array<string> =['Fully','Semi','Unfurnished']
 propertyView : IProperty ={
  Id:null,
  Name:'',
  Price:null,
  SellRent:null,
  pType:null,
  BHK:null,
  BuiltArea:null,
  City:null,
  RTM:null
 };

  constructor(private router: Router, private fb: FormBuilder,
    private housingService : HousingService
    ,private alertify : AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo : this.fb.group({
        SellRent:['1',Validators.required],
        BHK: [null, Validators.required],
        pType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]}
      ),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossesionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })

    }
    );
  }
//#region <Getter Methods>
  // #region <FormGroups>
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
    //#endregion

  //#region <Form Controls>
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

  get pType() {
    return this.BasicInfo.get('pType') as FormControl;
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

  get PossesionOn() {
    return this.OtherInfo.get('PossesionOn') as FormControl;
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

    //#endregion
  onBack()
  {
    this.router.navigate(['/']);
  }
  onSubmit()
  {
    this.NextClicked=true;
    if(this.alltabsvalid())
    {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);
      if (this.SellRent.value === '2')
      {
        this.router.navigate(['/rent-property'])
      }
      else
      {
        this.router.navigate(['/'])
      }
    }
    else
    {
      this.alertify.failure('Please review the form and provide all valid enteries!');
    }


  }
  mapProperty(): void {
    this.property.Id= +this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.pType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossesionOn.value;
    this.property.Description = this.Description.value;
    this.property.Image = 'propNA';
    this.property.PostedOn = new Date().toString();
  }
  alltabsvalid(): boolean
  {
    if(this.BasicInfo.invalid){
      this.staticTabs.tabs[0].active = true;
      return false;
    }
    if(this.PriceInfo.invalid){
      this.staticTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.staticTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.staticTabs.tabs[3].active = true;
      return false;
    }
    return true;
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
