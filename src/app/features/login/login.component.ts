import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { RouteStateService } from '@core/services/route-state.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserContextService } from '@core/services/user-context.service';
import { MessageService } from 'primeng/api';

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
    private routeStateService: RouteStateService,
    private userContextService: UserContextService,
    private _builder: FormBuilder,
    private messageService: MessageService
  ) {
    this.LoginForm = this._builder.group({
      username: ['', Validators.required],
      userpassword: ['', Validators.required]
    });
  }
  focusUser: string = "";
  focusPassword: string = "";

  ngOnInit(): void {
    this.userName = '';
    this.userPassword = '';
    this.msgs = [{ severity: 'info', detail: 'Username: admin' }, { severity: 'info', detail: 'Password: password' }];
  }

  password() {
    this.focusPassword = "focus";
  }

  user() {
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
      this.messageService.add({ severity: 'error', summary: 'Usuario Invalido.', detail: 'Usuario o contraseña incorrecto' });
    }
  }

}
