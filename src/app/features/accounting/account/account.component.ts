import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Account } from '@core/models';
import { AccountService } from '@core/services/account.service';
import { first } from 'rxjs/operators';

@Component({
  providers: [ConfirmationService],
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  model: Account = new Account();
  accounts: Account[] = [];
  filterAccounts: Account[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  natures: SelectItem[] = [
    { label: 'Debito', value: 'D' },
    { label: 'Credito', value: 'C' },
  ];

  constructor(
    private routeStateService: RouteStateService,
    private service: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.routeStateService.add('Cuentas', 'accounts', null, true);
    this.getAll();
  }

  async getAll() {
    this.accounts = await this.service.getAll();
  }

  filterAccount(event): void {
    let { query } = event;
    this.filterAccounts = this.accounts.filter((account) => {
      return account.code.toLowerCase() === query.toLowerCase();
    });
  }

  newAccount() {
    this.showModal = true;
  }

  modifyAccount(account: Account) {
    this.model = account;
    this.showModal = true;
  }

  saveAccount() {
    if (!this.model.id) {
      this.service
        .create(this.model)
        .pipe(first())
        .subscribe(
          (response) => {
            this.model = response;
            this.accounts.push(this.model);
            this.showModal = false;
            this.messageService.add({
              severity: 'success',
              summary: `Cuenta creada con éxito`,
              detail: `Código: ${this.model.code} Descripción: ${this.model.description}`,
            });
          },
          (error) => console.error(error)
        );
    } else {
      this.service
        .update(this.model.id, this.model)
        .pipe(first())
        .subscribe(
          (response) => {
            if (response['success']) {
              this.accounts = this.accounts.map((x) => {
                if (x.id == this.model.id) x = this.model;
                return x;
              });
              this.messageService.add({
                severity: 'success',
                summary: `Cuenta actualizada con éxito`,
              });
              this.showModal = false;
            }
          },
          (error) => console.error(error)
        );
    }
  }

  deletedAccount(account: Account) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${account.code} - ${account.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service
          .delete(account.id, account)
          .pipe(first())
          .subscribe(
            (data) => {
              if (data['success']) {
                this.accounts = this.accounts.filter((x) => x.id != account.id);
                this.messageService.add({
                  severity: 'success',
                  summary: '',
                  detail: 'Cuenta eliminada con éxito',
                });
              }
            },
            (error) => console.log(error)
          );
      },
    });
  }
}
