import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouteStateService } from 'src/app/core/services/route-state.service';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private routeStateService: RouteStateService) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Inventario',
        icon: 'pi pi-pw pi-book',
        items: [
          { label: 'Materia prima', icon: 'pi pi-fw pi-clone', routerLink: ["/inventary/raw-materials"] },
          { separator: true },
          { label: 'Producto', icon: 'pi pi-fw pi-send', routerLink: ["/inventary/products"] },
          { separator: true },
          { label: 'Empaque', icon: 'pi pi-fw pi-briefcase', routerLink: ["/inventary/packings"] },
          { separator: true },
          { label: 'Produción', icon: 'pi pi-fw pi-sitemap', routerLink: ["/inventary/productions"] }
        ]
      }
    ];
  }

}
