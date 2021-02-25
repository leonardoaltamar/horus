import { TypeSupplier } from '@core/models/type-supplier.model';
import { TypeSupplierService } from '@core/services/type-supplier.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'type-supplier',
  templateUrl: './type-supplier.component.html',
  styleUrls: ['./type-supplier.component.css'],
  providers: [ConfirmationService]
})

export class TypeSupplierComponent {
  form_TypeSupplier: FormGroup;
  model: TypeSupplier = new TypeSupplier();
  typeSuppliers: TypeSupplier[] = [];

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: TypeSupplierService){
      this.form_TypeSupplier = this._formuilder.group({
        code: ['', [Validators.required], [this.validate_typeSupplier.bind(this)]],
        description: ['', [Validators.required], []]
      })
    }

  ngOnInit(): void {
    this.routeStateService.add("Tipos de proveedores", "/configuration/type_supplier", null, false);
    this.getAllTypeSupplier();
  }

  async validate_typeSupplier(control: AbstractControl) {
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

  newTypeSupplier() {
    this.model = new TypeSupplier();
    this.showModal = true;
  }

  async getAllTypeSupplier() {
    try {
      this.isLoading = true;
      this.typeSuppliers = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveTypeSupplier() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          this.typeSuppliers.push(this.model);
          this.messageService.add({ severity: 'success', summary: `tipo de proveedor creado con éxito`, detail: `Code: ${data.code} Description: ${data.description}` });
        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.typeSuppliers = this.typeSuppliers.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Tipo de proveedor actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyTypeSupplier(typeSupplier: TypeSupplier) {
    this.model = typeSupplier;
    this.showModal = true;
  }

  deletedTypeSupplier(typeSupplier: TypeSupplier) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${typeSupplier.code} - ${typeSupplier.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(typeSupplier.id, typeSupplier).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.typeSuppliers = this.typeSuppliers.filter((x) => x.id != typeSupplier.id);
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