import { TypePaymentService } from './../../../core/services/type-payment.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { TypePayment } from '@core/models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'type-payment',
  templateUrl: './type-payment.component.html',
  styleUrls: ['./type-payment.component.css'],
  providers: [ConfirmationService]
})

export class TypePaymentComponent {

  form_TypePayment: FormGroup;
  model: TypePayment = new TypePayment();
  typePayments: TypePayment[] = [];

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: TypePaymentService){
      this.form_TypePayment = this._formuilder.group({
        code: ['', [Validators.required], []],
        description: ['', [Validators.required], []]
      })
    }

  ngOnInit(): void {
    this.routeStateService.add("Tipos de pagos", "/configuration/type_payment", null, false);
    this.getAllTypePayment();
  }



  newTypePayment() {
    this.model = new TypePayment();
    this.showModal = true;
  }

  async getAllTypePayment() {
    try {
      this.isLoading = true;
      this.typePayments = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveTypePayment() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          if(data['errno']){
            this.messageService.add({ severity: 'error', summary: data['sqlMessage'], detail: `descripcion: ${this.model.description}` });
          }else{
            this.model = data;
            this.typePayments.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Tipo de pago creado con éxito`, detail: `Code: ${data.code} Description: ${data.description}` });

          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.typePayments = this.typePayments.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Tipo de pago actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyTypePayment(typePayment: TypePayment) {
    this.model = typePayment;
    console.log(this.model );

    this.showModal = true;
  }

  deletedTypePayment(typePayment: TypePayment) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${typePayment.code} - ${typePayment.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(typePayment.id, typePayment).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.typePayments = this.typePayments.filter((x) => x.id != typePayment.id);
              this.messageService.add({ severity: 'success', summary: `Tipo de pago eliminado con éxito` });
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
