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
          { label: 'Ventas', icon: 'fas pi-fw fa-truck', routerLink: ["/process/sales"] },
          { label: 'Compras', icon: 'fas pi-fw fa-shopping-cart', routerLink: ["/process/purchases"] },
        ]
      },
      {
        label: 'Inventario',
        icon: 'fas pi-pw fa-inventory',
        items: [
          { label: 'Producción', icon: 'fas pi-fw fa-hand-holding-box', routerLink: ["/inventary/productions"] },
          { label: 'Artículos', icon: 'fas fa-shopping-cart', routerLink: ["/inventary/articles"] },
          { label: 'Movimiento de inventario', icon: 'fas fa-shopping-cart', routerLink: ["/inventary/inventory_movements"] },
        ]
      },
      {
        label: 'Gestión humano',
        icon: 'fas fa-users',
        items: [
          { label: 'Clientes', icon: 'fas pi-fw fa-users', routerLink: ["/configuration/customers"] },
          { label: 'Proveedores', icon: 'fas pi-fw fa-person-dolly', routerLink: ["/configuration/suppliers"] },
          { label: 'Empleados', icon: 'fas pi-fw fa-user-tie', routerLink: ["/configuration/employee"] },
          { label: 'Tipos de empleados', icon: 'fas fa-user-cog', routerLink: ["/configuration/type_employee"] },
          { label: 'Tipos de proveedores', icon: 'fas pi-fw fa-people-carry', routerLink: ["/configuration/type_supplier"] }
        ]
      },
      {
        label: 'Ajustes',
        icon: 'fas fa-cogs',
        items: [
          { label: 'Categorias', icon: 'fas fa-cubes', routerLink: ["/configuration/categories"] },
          { label: 'Departamentos', icon: 'fas pi-fw fa-city', routerLink: ["/configuration/states"] },
          { label: 'Ciudades', icon: 'fas pi-fw fa-building', routerLink: ["/configuration/cities"] },
          { label: 'Medidas', icon: 'fas pi-fw fa-balance-scale-right', routerLink: ["/configuration/measurements"] },
          { label: 'Tipos de pago', icon: 'fas pi-fw fa-money-check-alt', routerLink: ["/configuration/type_payment"] },
        ]
      }
    ];
  }

}
