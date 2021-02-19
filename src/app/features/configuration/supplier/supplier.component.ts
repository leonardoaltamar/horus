import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [ConfirmationService]
})
export class SupplierComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  showPhone: boolean = false;
  showEmail: boolean = false;

  document: { tipe: string }[];
  city: { name: string }[];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/suppliers", null, false);
    this.document = [
      { tipe: 'Cédula de ciudadanía' },
      { tipe: 'Cédula de extranjería' },
      { tipe: 'Pasaporte' }
    ]
    this.city = [
      { name: 'Bogota' },
      { name: 'Barranquilla' },
      { name: 'Cali' }
    ]
  }

  newSupplier() {
    this.showModal = true;
  }

  addPhone() {
    this.showPhone = true;
  }

  deletePhone() {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.showPhone = false;
      }
    });
  }

  addEmail() {
    this.showEmail = true;
  }

  deleteEmail() {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este correo?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.showEmail = false;
      }
    });
  }

}