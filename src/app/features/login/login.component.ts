import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hrs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  focusUser:string = "";
  focusPassword:string = "";
  ngOnInit(): void {
    console.log("estoy iniciando desde el ngOnInit");
  }

  password(event){
    this.focusPassword = "focus";
  }
  user(event){
    this.focusUser = "focus";
  }
}
