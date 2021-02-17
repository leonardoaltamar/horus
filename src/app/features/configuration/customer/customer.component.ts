import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

//Models
import { Customer } from '@core/models/customer.model';
import { Location } from '@core/models/location.model';

//Services
import { CustomerService } from '@core/services/customer.service';
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';

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
  cities: SelectItem[] = [];
  gerder: SelectItem[] = [];
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
      mainMail: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      secondaryMail: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      mainPhone: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
      secondaryPhone: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
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

    this.cityService.getAll().then(data =>
      data.forEach(x =>
        this.cities.push({
          label: x.name,
          value: x.id
        })
      )
    );

    this.gerderService.getAll().then(data =>
      data.forEach(x =>
        this.gerder.push({
          label: x.name,
          value: x.id
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
    this.showModal = true;
    this.customer.person.emails[0] = null;
    this.customer.person.mobilePhones[0] = null;
  }

  saveCustomer() {
    this.customer.person.locations.forEach((item, index) => { this.customer.person.locations[index].main = item.main ? 1 : 0 });
    if (!this.customer.id) {
      this.customerService.create(this.customer).pipe(first()).subscribe(
        data => {
          console.log(data);
          this.customer = data;
          console.log(this.customer.person.gender.id);
          this.customers.push(this.customer);
          this.messageService.add({ severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${data.person.documentNumber} Nombre: ${data.person.name} ${data.person.surname}` });
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

  //validations Phone
  addPhone() {
    this.showPhone = true;
    this.customer.person.mobilePhones[1] = null;
  }

  deletePhone() {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.showPhone = false;
        this.customer.person.mobilePhones.pop();
      }
    });
  }

  //validations Email
  addEmail() {
    this.showEmail = true;
    this.customer.person.emails[1] = null;
  }

  deleteEmail() {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este correo?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.showEmail = false;
        this.customer.person.emails.pop();
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
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }
}
