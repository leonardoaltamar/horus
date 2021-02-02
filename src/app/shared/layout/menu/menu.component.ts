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
          { label: 'Materia prima', icon: 'pi pi-fw pi-clone', url:'inventary/raw-materials' },
          { separator: true },
          { label: 'Producto', icon: 'pi pi-fw pi-send', url:'inventary/products' },
          { separator: true },
          { label: 'Empague', icon: 'pi pi-fw pi-briefcase', url:'inventary/packings' },
          { separator: true },
          { label: 'Produccion', icon: 'pi pi-fw pi-sitemap', url:'inventary/productions' }
        ]
      }
    ];
  }

}
