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
        icon: 'pi pi-pw pi-users',
        items: [
          { label: 'Entrada', icon: 'pi pi-fw pi-sign-in', routerLink: [""] },
          { separator: true },
          { label: 'Salida', icon: 'pi pi-fw pi-sign-out', routerLink: [""] },
          { separator: true }
        ]
      }, {
        label: 'Ajustes',
        icon: 'pi pi-pw pi-cog',
        items: [
          { label: 'Productos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ["/inventary/products"] },
          { separator: true },
          { label: 'Categorias', icon: 'pi pi-fw pi-th-large', routerLink: ["/configuration/categorys"] },
          { separator: true }
        ]
      }, {
        label: 'Inventario',
        icon: 'pi pi-pw pi-sitemap',
        items: [
          { label: 'Materia prima', icon: 'pi pi-fw pi-clone', routerLink: ["/inventary/raw-materials"] },
          { separator: true },
          { label: 'Produccion', icon: 'pi pi-fw pi-send', routerLink: ["/inventary/productions"] },
          { separator: true },
          { label: 'Empaque', icon: 'pi pi-fw pi-briefcase', routerLink: ["/inventary/packings"] },
          { separator: true }
        ]
      }, {
        label: 'Parametros',
        icon: 'pi pi-pw pi-book',
        items: [
          { label: 'Entrada', icon: 'pi pi-fw pi-sign-in', routerLink: [""] },
          { separator: true },
          { label: 'Salida', icon: 'pi pi-fw pi-sign-out', routerLink: [""] },
          { separator: true }
        ]
      }
    ];
  }

}
