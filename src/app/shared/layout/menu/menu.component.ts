import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { MenuDataService } from './../../../core/services/menu-data.service';

@Component({
  selector: 'hr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  //Estado del menu
  visible: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private menuDataService: MenuDataService) { }

  items: MenuItem[];

  ngOnInit() {
    //Metodo de estado del
    var that = this;
    this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
      if (data && data != null) {
        that.visible = !that.visible;
      }
    });

    this.items = [
      {
        label: 'Remisiones',
        icon: 'fas pi-pw fa-list-alt',
        items: [
          { label: 'Compras', icon: 'fas pi-fw fa-shopping-cart', routerLink: [""] },
          { label: 'Ventas', icon: 'fas pi-fw fa-truck', routerLink: [""] },
        ]
      },
      {
        label: 'Parametros',
        icon: 'fas pi-pw fa-align-left',
        items: [
          { label: 'Entrada', icon: 'pi pi-fw pi-sign-in', routerLink: [""] },
          { label: 'Salida', icon: 'pi pi-fw pi-sign-out', routerLink: [""] },
        ]
      },
      {
        label: 'Inventario',
        icon: 'fas pi-pw fa-inventory',
        items: [
          { label: 'Productos', icon: 'fas fa-shopping-cart', routerLink: ["/inventary/products"] },
          { label: 'Materia prima', icon: 'fas pi-fw fa-conveyor-belt-alt', routerLink: ["/inventary/raw-materials"] },
          { label: 'Produccion', icon: 'fas pi-fw fa-hand-holding-box', routerLink: ["/inventary/productions"] },
          { label: 'Empaque', icon: 'fas pi-fw fa-box', routerLink: ["/inventary/packings"] },
        ]
      },
      {
        label: 'Ajustes',
        icon: 'fas fa-cogs',
        items: [
          { label: 'Categorias', icon: 'fas fa-cubes', routerLink: ["/configuration/categories"] },
          { label: 'Clientes', icon: 'fas pi-fw fa-users', routerLink: ["/configuration/customers"] },
          { label: 'Vendedores', icon: 'fas pi-fw fa-user-tie', routerLink: ["/configuration/salesmen"] },
          { label: 'Proveedores', icon: 'fas pi-fw fa-person-dolly', routerLink: ["/configuration/suppliers"] },
          { label: 'Departamentos', icon: 'fas pi-fw fa-city', routerLink: ["/configuration/states"] },
          { label: 'Ciudades', icon: 'fas pi-fw fa-building', routerLink: ["/configuration/cities"] },
          { label: 'Medidas', icon: 'fas pi-fw fa-balance-scale-right', routerLink: ["/configuration/measurements"] }
        ]
      }
    ];
  }

}
