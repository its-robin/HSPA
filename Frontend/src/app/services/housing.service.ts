import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  getAllProperties(SellRent: number){
     return this.http.get<any[]>('data/properties.json').pipe(
      map(data =>  {
        const propertiesArray : Array<IPropertyBase>=[];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));
        if(localProperties){

          for (const Id in localProperties )
          {
            if(localProperties.hasOwnProperty(Id) && localProperties[Id].SellRent === SellRent )
            {
              propertiesArray.push(localProperties[Id]);
            }
          }
        }


        for (const id in data )
        {
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent )
          {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })

     );
  }
  addProperty(property: Property) {
    let newProp = [property];

    if(localStorage.getItem('newProp')){
      newProp= [property, ...JSON.parse(localStorage.getItem('newProp') as string )];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID(){
    if(localStorage.getItem('PID'))
    {
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID');
    }
    else
    {
     localStorage.setItem('PID','101')
     return localStorage.getItem('PID');
    }
  }
}
