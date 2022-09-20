import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: any;
  constructor(private alertify: AlertifyService,private router : Router) { }

  ngOnInit(): void {
  }
  loggedIn(){
   this.loggedinUser= localStorage.getItem('token');
   return this.loggedinUser;
  }
  onLogout(){
    return localStorage.removeItem('token');
    this.alertify.success('Logged out successfully!')
    this.router.navigate(['user/login']);
  }
}
