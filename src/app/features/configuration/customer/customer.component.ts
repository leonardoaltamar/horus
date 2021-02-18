import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

//Models
import { Customer } from '@core/models/customer.model';
import { City } from '@core/models/city.model';
import { Location } from '@core/models/location.model';

//Services
import { CustomerService } from '@core/services/customer.service';
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';
import { Email } from '@core/models/email.model';
import { MobilePhone } from '@core/models/mobilePhone.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ConfirmationService]
})

export class CustomerComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  showPhone: boolean = false;
  showEmail: boolean = false;
  form_customer: FormGroup;

  //Customer
  customer: Customer = new Customer();
  customers: Customer[] = [];
  cities: City[] = [];
  gender: SelectItem[] = [];
  document: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private cityService: CityService,
    private locationService: LocationService,
    private emailService: EmailService,
    private mobilePhoneService: MobilePhoneService,
    private gerderService: GerderService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {
    this.form_customer = this._formBuilder.group({
      typeDocument: ['', [Validators.required]],
      document: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern(/^([0-9])*$/)]],
      expeditionCity: [''],
      expeditionDate: [''],
      birthDate: ['', [Validators.required]],
      gender: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      surName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      secondSurname: [''],

      emails: this._formBuilder.array([this._formBuilder.group({
        email: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
        main: [false]
      })]),

      mobilePhones: this._formBuilder.array([this._formBuilder.group({
        number: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
        main: [false]
      })]),

      addresses: this._formBuilder.array([this._formBuilder.group({
        city: [''],
        address: [''],
        neighborhood: [''],
        phoneNumber: [''],
        main: [false]
      })])
    });

  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/customers", null, false);
    this.getAllCustomer();

    this.cityService.getAll().then(data => { this.cities = data; });

    this.gerderService.getAll().then(data =>
      data.forEach(x =>
        this.gender.push({
          label: x.name,
          value: x
        })
      )
    );

    this.document.push(
      {
        label: 'Cédula de ciudadanía',
        value: 'Cédula de ciudadanía'
      },
      {
        label: 'Cédula de extranjería',
        value: 'Cédula de extranjería'
      },
      {
        label: 'Pasaporte',
        value: 'Pasaporte'
      }
    )
  }

  newCustomer() {
    this.customer = new Customer;
    this.form_customer.reset();
    this.showModal = true;
  }

  saveCustomer() {
    this.customer.person.emails.forEach((item, index) => { this.customer.person.emails[index].main = item.main ? 1 : 0 });
    this.customer.person.mobilePhones.forEach((item, index) => { this.customer.person.mobilePhones[index].main = item.main ? 1 : 0 });
    this.customer.person.locations.forEach((item, index) => { this.customer.person.locations[index].main = item.main ? 1 : 0 });
    if (!this.customer.id) {
      this.customerService.create(this.customer).pipe(first()).subscribe(
        data => {
          console.log(data);
          console.log(this.customer);
          this.customers.push(this.customer);
          this.messageService.add({
            severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${this.customer.person.documentNumber}
          Nombre: ${this.customer.person.name} ${this.customer.person.surname}`
          });
          this.showModal = false;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.customerService.update(this.customer.id, this.customer).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.customers = this.customers.map(x => {
              if (x.id == this.customer.id)
                x = this.customer;
              return x
            });
            this.showModal = false;
            this.messageService.add({ severity: 'success', summary: `Departamento actualizada con éxito` });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  modifyCustomer(customer: Customer) {
    this.customer = customer;
    this.showModal = true;
  }

  deleteCustomer(customer: Customer) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${customer.person.name} ${customer.person.surname} ${customer.person.secondSurname}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.customerService.delete(customer.id, customer).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.customers = this.customers.filter((x) => x.id != customer.id);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  //validations Phone
  addPhone() {
    this.customer.person.mobilePhones = [...this.customer.person.mobilePhones];
    this.customer.person.mobilePhones.push(new MobilePhone())
    this.mobilePhones.push(this._formBuilder.group({
      number: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
      main: [false]
    }));
  }
  get mobilePhones(): FormArray {
    return this.form_customer.get('mobilePhones') as FormArray;
  }

  deletePhone(mobile: MobilePhone, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!mobile.id) {
          this.customer.person.mobilePhones.splice(rowIndex, 1);
        } else {
          this.mobilePhoneService.delete(mobile.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.customer.person.mobilePhones = this.customer.person.mobilePhones.filter((x) => x.id != mobile.id);
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    });
  }

  //validations Email
  addEmail() {
    this.customer.person.emails = [...this.customer.person.emails];
    this.customer.person.emails.push(new Email());
    this.emails.push(this._formBuilder.group({
      email: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      main: [false]
    }));
  }
  get emails(): FormArray {
    return this.form_customer.get('emails') as FormArray;
  }

  deleteEmail(email: Email, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este correo?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!email.id) {
          this.customer.person.emails.splice(rowIndex, 1);
        } else {
          this.emailService.delete(email.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.customer.person.emails = this.customer.person.emails.filter((x) => x.id != email.id);
              }
            },
            error => {
              console.log(error);
            });
        }
      }
    });
  }

  //validations addresses
  addRow() {
    this.customer.person.locations = [...this.customer.person.locations];
    this.customer.person.locations.push(new Location());
    this.addresses.push(this._formBuilder.group({
      city: [''],
      address: [''],
      neighborhood: [''],
      phoneNumber: [''],
      main: [false]
    }))

  }
  get addresses(): FormArray {
    return this.form_customer.get('addresses') as FormArray;
  }

  deleteRow(row: Location, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar esta dirección?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!row.id) {
          this.customer.person.locations.splice(rowIndex, 1);
        } else {
          this.locationService.delete(row.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.customer.person.locations = this.customer.person.locations.filter((x) => x.id != row.id);
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    });
  }

  //validations Document Student
  async validate_document(control: AbstractControl) {
    const val = control.value;
    const response = await this.customerService.getAll();
    if (this.customer.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].person.documentNumber == val) {
          return { A: true };
        }
      }
    }
  }

  // get all customers
  async getAllCustomer() {
    try {
      this.isLoading = true;
      this.customers = await this.customerService.getAll();
      console.log(this.customers);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }
}
