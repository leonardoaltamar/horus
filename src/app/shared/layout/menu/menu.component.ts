import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }
  items: NbMenuItem[] = [
    {
      title: 'Productos',

    },
    {
      title: 'Clientes',

    },
    {
      title: 'Reportes',

    }
  ];
  ngOnInit(): void {
  }

}
