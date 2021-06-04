import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProcessType, Account, AccountingProcess } from '@core/models'
import { ProcessTypeService } from '@core/services/process-type.service';
import { AccountService } from '@core/services/account.service';


@Component({
  selector: 'processType',
  templateUrl: './process-type.component.html',
  styleUrls: ['./process-type.component.css'],
  providers: [ConfirmationService]
})

export class ProcessTypeComponent {
  form_processType: FormGroup;
  model: ProcessType = new ProcessType();
  processTypes: ProcessType[] = [];
  accounts: Account[] = [];
  filterAccounts: Account[] = [];
  accountingProcess: AccountingProcess = new AccountingProcess();
  isLoading: boolean = false;
  showModal: boolean = false;
  text: string = "";

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formuilder: FormBuilder,
    private service: ProcessTypeService,
    private accountService: AccountService){
      this.form_processType = this._formuilder.group({
        code: ['', [Validators.required], []],
        name: ['', [Validators.required], []],
        account: [''],
        caccount: [''],
        processNature: [''],
        ivaAccountNature: [''],
        ivaAccount: [''],
        ivaAcountNature: [''],
        reteIvaAccount: [''],
        reteIvaAccountNature: [''],
        reteIcaAccount: [''],
        reteIcaAccountNature: [''],
        reteFuenteAccount: [''],
        reteFuenteAccountNature: ['']
      })
    }


  ngOnInit(): void {
    this.routeStateService.add("Tipo de proceso", "/configuration/process_types", null, false);
    this.getAllprocessTypes();
    this.getAllAccounts();


  }

  async getAllAccounts(){
    this.accounts = await this.accountService.getAll();
    this.accounts = this.accounts.map(account => {
      account.name = account.code + " - " +account.name;
      return account;
    });
  }

  newProcessType() {
    this.model = new ProcessType();
    this.showModal = true;
  }

  async getAllprocessTypes() {
    try {
      this.isLoading = true;
      this.processTypes = await this.service.getAll();
      console.log(this.processTypes);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveProcessType() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: `tipo de proceso creado con éxito`, detail: `Nombre: ${this.model.name}` });
          console.log(data);
          this.model = data;
          this.processTypes.push(this.model);
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
            this.processTypes = this.processTypes.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `tipo de proceso actualizado con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyProcessType(processType: ProcessType) {
    this.model = processType;
    this.showModal = true;
  }

  deletedProcessType(processType: ProcessType) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${processType.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(processType.id, processType).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.processTypes = this.processTypes.filter((x) => x.id != processType.id);
              this.messageService.add({ severity: 'success', summary: '', detail: 'Tipo de proceso eliminado con éxito' });
            };
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }


  filterAccount(event): void {
    let filtered: Account[] = [];
    let { query } = event;

    this.accounts.forEach( account => {
      if (account.code.indexOf(query) >= 0) {
          filtered.push(account);
      }
    });
    this.filterAccounts = filtered;

  }

  filterReload(): void {

  }

  processNature(checked: boolean){
    if (checked) {
    this.model.accountingProcess.processNature = 'D';
    }
    if (!checked) {
      this.model.accountingProcess.processNature = 'C';
      }

      console.log(this.model.accountingProcess.processNature);

  }

  ivaAccountNature(checked: boolean){
    if (checked) {
    this.model.accountingProcess.ivaAccountNature = 'D';
    }
    if (!checked) {
      this.model.accountingProcess.ivaAccountNature = 'C';
      }

  }
  reteIvaAccountNature(checked: boolean){
    if (checked) {
    this.model.accountingProcess.reteIvaAccountNature = 'D';
    console.log(this.model)
    }
    if (!checked) {
      this.model.accountingProcess.reteIvaAccountNature = 'C';
      }


  }

  reteIcaAccountNature(checked: boolean){
    if (checked) {
    this.model.accountingProcess.reteIcaAccountNature = 'D';
    }
    if (!checked) {
      this.model.accountingProcess.reteIcaAccountNature = 'C';
      }

  }
  reteFuenteAccountNature(checked: boolean){
    if (checked) {
    this.model.accountingProcess.reteFuenteAccountNature = 'D';
    }
    if (!checked) {
      this.model.accountingProcess.reteFuenteAccountNature = 'C';
      }

  }

}
