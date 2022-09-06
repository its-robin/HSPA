import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

success()
{
  alertyfy.success('Congrats , you are registered!')
}
failure()
{
  alertyfy.error('Please provide all requiste fields!')
}
}
