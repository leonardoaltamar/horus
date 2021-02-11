import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { ToastService } from '@core/services/toast.service';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserContextService } from '@core/services/user-context.service';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'hrs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  version: string;
  msgs: any[];
  isLoading: boolean = false;
  userName: string;
  userPassword: string;


  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private routeStateService: RouteStateService,
    private userContextService: UserContextService,
    private _builder: FormBuilder
  ) { }
  focusUser: string = "";
  focusPassword: string = "";

  ngOnInit(): void {
    this.userName = '';
    this.userPassword = '';
    this.msgs = [{ severity: 'info', detail: 'Username: admin' }, { severity: 'info', detail: 'Password: password' }];
    console.log("estoy iniciando desde el ngOnInit");
  }

  password(event) {
    this.focusPassword = "focus";
  }

  user(event) {
    this.focusUser = "focus";
  }

  async onClickLogin() {
    try {
      this.isLoading = true;
      const user = await this.authService.singIn(this.userName, this.userPassword);
      if (user) {
        this.userContextService.setUser(user);
        this.routeStateService.add("Dashboard", '/main', null, true);
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.toastService.addSingle('error', '', 'Usuario Invalido.');
    }
  }

}
