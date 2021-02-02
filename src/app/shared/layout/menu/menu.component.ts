import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Inventario',
        icon: 'pi pi-pw pi-book',
        items: [
          { label: 'Materia prima', icon: 'pi pi-fw pi-clone' },
          { separator: true },
          { label: 'Producto', icon: 'pi pi-fw pi-send' },
          { separator: true },
          { label: 'Empague', icon: 'pi pi-fw pi-briefcase' },
          { separator: true },
          { label: 'Produccion', icon: 'pi pi-fw pi-sitemap' }
        ]
      }
    ];
  }

}
