import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuDataService } from '@core/services/menu-data.service';
import { AuthenticationService } from '@core/services/authentication.service';


@Component({
  selector: 'hr-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  constructor(private menuDataService: MenuDataService,
    private authenticationService: AuthenticationService) {
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);
  }

  ngOnInit() {

  }

  logout() {
    // remove user from local storage and set current user to null
    this.authenticationService.logout();
  }
}
