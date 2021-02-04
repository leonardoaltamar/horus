import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuDataService } from './../../../core/services/menu-data.service';

@Component({
  selector: 'hr-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  constructor(private menuDataService: MenuDataService) {
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);
  }

  ngOnInit() {

  }
}
