import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaxRegime } from '@core/models'
import { TaxRegimeService } from '@core/services/tax-regime.service';


@Component({
  selector: 'taxRegime',
  templateUrl: './tax-regime.component.html',
  styleUrls: ['./tax-regime.component.css'],
  providers: [ConfirmationService]
})

export class TaxRegimeComponent {
  form_taxRegime: FormGroup;
  model: TaxRegime = new TaxRegime();
  taxRegimes: TaxRegime[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: TaxRegimeService){
      this.form_taxRegime = this._formuilder.group({
        name: ['', [Validators.required], []]
      })
    }

  ngOnInit(): void {
    this.routeStateService.add("Regimen fiscales", "/configuration/tax_regime", null, false);
    this.getAllTaxRegimes();
  }

  newTaxRegime() {
    this.model = new TaxRegime();
    this.showModal = true;
  }

  async getAllTaxRegimes() {
    try {
      this.isLoading = true;
      this.taxRegimes = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveTaxRegime() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          this.taxRegimes.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Régimen creado con éxito`, detail: `Nombre: ${data.name}` });
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
            this.taxRegimes = this.taxRegimes.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Régimen actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyTaxRegime(taxRegime: TaxRegime) {
    this.model = taxRegime;
    this.showModal = true;
  }

  deletedTaxRegime(taxRegime: TaxRegime) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${taxRegime.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(taxRegime.id, taxRegime).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.taxRegimes = this.taxRegimes.filter((x) => x.id != taxRegime.id);
              this.messageService.add({ severity: 'success', summary: '', detail: 'Régimen eliminado con éxito' });
            }
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }
}
