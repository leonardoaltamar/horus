import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { RouteStateService } from '@core/services/route-state.service';


@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css'],
  providers: [ConfirmationService]
})
export class SalesmanComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  showPhone: boolean = false;
  showEmail: boolean = false;
  imageUrl: any;

  document: { tipe: string }[];
  city: { name: string }[];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/salesmen", null, false);
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

  imgUrlChange(event: any) {
    this.imageUrl = event;
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageUrl = reader.result.toString();
    }
  }

  newSalesman() {
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
