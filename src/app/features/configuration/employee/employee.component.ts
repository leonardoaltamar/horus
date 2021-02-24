import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

//Models
import { City } from '@core/models/city.model';
import { Location } from '@core/models/location.model';

//Services
import { PersonService } from '@core/services/person.service';
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { EmployeeService } from './../../../core/services/employee.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';
import { Email } from '@core/models/email.model';
import { MobilePhone } from '@core/models/mobilePhone.model';
import { Employee } from '../../../core/models';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ConfirmationService]
})
export class EmployeeComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  form_salesman: FormGroup;

  //Customer
  employee: Employee = new Employee();
  employees: Employee[] = [];
  cities: City[] = [];
  gender: SelectItem[] = [];
  document: SelectItem[] = [];
  imageUrl: any;
  types: SelectItem[] = [
    { label: 'Vendedor', value: 'S' },
    { label: 'Transportista', value: 'C' },
  ]

  city: { name: string }[];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private personService: PersonService,
    private cityService: CityService,
    private locationService: LocationService,
    private emailService: EmailService,
    private mobilePhoneService: MobilePhoneService,
    private gerderService: GerderService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {
    this.form_salesman = this._formBuilder.group({
      typeDocument: ['', [Validators.required]],
      document: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern(/^([0-9])*$/)], [this.validate_document.bind(this)]],
      expeditionCity: [''],
      birthDate: [''],
      gender: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      surName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      secondSurname: [''],
      type: [''],
      licensePlate: [''],

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
    this.routeStateService.add("Configuration", "/configuration/employee", null, false);
    this.getAllSalesMan();

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

  saveSalesMan() {
    this.employee.person.emails.forEach((item, index) => { this.employee.person.emails[index].main = item.main ? 1 : 0 });
    this.employee.person.mobilesPhones.forEach((item, index) => { this.employee.person.mobilesPhones[index].main = item.main ? 1 : 0 });
    this.employee.person.locations.forEach((item, index) => { this.employee.person.locations[index].main = item.main ? 1 : 0 });
    if (!this.employee.id) {
      this.employeeService.create(this.employee).pipe(first()).subscribe(
        data => {
          this.employee = data;
          this.employees.push(this.employee);
          this.messageService.add({
            severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${this.employee.person.documentNumber}
          Nombre: ${this.employee.person.name} ${this.employee.person.surname}`
          });
          this.showModal = false;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.employeeService.update(this.employee.id, this.employee).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.employees = this.employees.map(x => {
              if (x.id == this.employee.id)
                x = this.employee;
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

  modifyEmployee(employee: Employee) {
    this.employee = employee;
    this.showModal = true;
  }

  //validations Phone
  addMobile() {
    this.employee.person.mobilesPhones = [...this.employee.person.mobilesPhones];
    this.employee.person.mobilesPhones.push(new MobilePhone());
    this.mobilePhones.push(this._formBuilder.group({
      number: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
      main: [false]
    }));
  }

  get mobilePhones(): FormArray {
    return this.form_salesman.get('mobilePhones') as FormArray;
  }

  deletePhone(mobile: MobilePhone, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!mobile.id) {
          this.employee.person.mobilesPhones.splice(rowIndex, 1);
        } else {
          this.mobilePhoneService.delete(mobile.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.employee.person.mobilesPhones = this.employee.person.mobilesPhones.filter((x) => x.id != mobile.id);
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
    this.employee.person.emails = [...this.employee.person.emails];
    this.employee.person.emails.push(new Email());
    this.emails.push(this._formBuilder.group({
      email: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      main: [false]
    }));
  }
  get emails(): FormArray {
    return this.form_salesman.get('emails') as FormArray;
  }

  deleteEmail(email: Email, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este correo?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!email.id) {
          this.employee.person.emails.splice(rowIndex, 1);
        } else {
          this.emailService.delete(email.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.employee.person.emails = this.employee.person.emails.filter((x) => x.id != email.id);
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
    this.employee.person.locations = [...this.employee.person.locations];
    this.employee.person.locations.push(new Location());
    this.addresses.push(this._formBuilder.group({
      city: [''],
      address: [''],
      neighborhood: [''],
      phoneNumber: [''],
      main: [false]
    }))

  }
  get addresses(): FormArray {
    return this.form_salesman.get('addresses') as FormArray;
  }

  deleteRow(row: Location, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar esta dirección?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!row.id) {
          this.employee.person.locations.splice(rowIndex, 1);
        } else {
          this.locationService.delete(row.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.employee.person.locations = this.employee.person.locations.filter((x) => x.id != row.id);
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
    const response = await this.employeeService.getAll();
    if (this.employee.id) {
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
  async getAllSalesMan() {
    try {
      this.isLoading = true;
      this.employees = await this.employeeService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

}
