import { TypeEmployeeService } from '@core/services/type-employee.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { TypeEmployee } from '@core/models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'type-empleyee',
  templateUrl: './type-employee.component.html',
  styleUrls: ['./type-employee.component.css'],
  providers: [ConfirmationService]
})

export class TypeEmployeeComponent {

  form_TypeEmployee: FormGroup;
  model: TypeEmployee = new TypeEmployee();
  typeEmployees: TypeEmployee[] = [];

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: TypeEmployeeService){
      this.form_TypeEmployee = this._formuilder.group({
        code: ['', [Validators.required], [this.validate_typeEmployee.bind(this)]],
        description: ['', [Validators.required], []]
      })
    }

  ngOnInit(): void {
    this.routeStateService.add("Tipos de pagos", "/configuration/type_employee", null, false);
    this.getAllTypeEmployee();
  }

  async validate_typeEmployee(control: AbstractControl) {
    const val = control.value;
    const response = await this.service.getAll();
    if (this.model.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true }
        }
      }
    }
  }

  newTypeEmployee() {
    this.model = new TypeEmployee();
    this.showModal = true;
  }

  async getAllTypeEmployee() {
    try {
      this.isLoading = true;
      this.typeEmployees = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveTypeEmployee() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          this.typeEmployees.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Tipo de empleado creado con éxito` });
        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado` });
        }
      );
    }
    else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.typeEmployees = this.typeEmployees.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Tipo de empleado actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyTypeEmployee(typeEmployee: TypeEmployee) {
    this.model = typeEmployee;
    this.showModal = true;
  }

  deletedTypeEmployee(typeEmployee: TypeEmployee) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${typeEmployee.code} - ${typeEmployee.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(typeEmployee.id, typeEmployee).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.typeEmployees = this.typeEmployees.filter((x) => x.id != typeEmployee.id);
              this.messageService.add({ severity: 'success', summary: `Tipo de empleado elimimado con éxito` });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
