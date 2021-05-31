import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Validations } from '../../../../utils/validations';

//Models
import { City } from '@core/models/city.model';
import { Location } from '@core/models/location.model';

//Services
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { EmployeeService } from './../../../core/services/employee.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';
import { Email } from '@core/models/email.model';
import { MobilePhone } from '@core/models/mobilePhone.model';
import { Employee } from '../../../core/models';
import { TypeEmployeeService } from '@core/services/type-employee.service';
import * as moment from 'moment';

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
  employee: Employee = new Employee();
  employees: Employee[] = [];
  typeEmployees: SelectItem[] = [];
  typeAccounts: SelectItem[] = [];
  cities: City[] = [];
  gender: SelectItem[] = [];
  document: SelectItem[] = [];
  imageUrl: any;
  city: { name: string }[];


  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private serviceTypeEmployee: TypeEmployeeService,
    private cityService: CityService,
    private locationService: LocationService,
    private emailService: EmailService,
    private mobilePhoneService: MobilePhoneService,
    private gerderService: GerderService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder) {
    this.form_salesman = this._formBuilder.group({
      typeDocument: ['', [Validators.required]],
      typeEmployee: ['', [Validations.validateDropdown]],
      gender: ['', [Validations.validateDropdown]],
      document: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern(/^([0-9])*$/)], [this.validate_document.bind(this)]],
      expeditionCity: [''],
      birthDate: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      surName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      secondSurname: [''],
      typeAccount: [''],
      bank: [''],
      accountNumber: [''],
      contractDate: [''],
      licensePlate: [''],
      emails: this._formBuilder.array([this.addEmailFormGroup()]),
      mobilePhones: this._formBuilder.array([this.addMobileFormGroup()]),
      addresses: this._formBuilder.array([this.addAdressFormGroup()])
    });
  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/employee", null, false);
    this.getAllSalesMan();
    this.getAllTypeEmployee();

    this.cityService.getAll().then(data => { this.cities = data; });

    this.gerderService.getAll().then(data =>
      data.forEach(x =>
        this.gender.push({
          label: x.name,
          value: x
        })
      )
    );
    this.typeAccounts.push(
      {label: 'Cuenta corriente', value: 'Cuenta corriente'},
      {label: 'Cuenta de ahorro', value: 'Cuenta de ahorro'},
      {label: 'Cuenta de nómina', value: 'Cuenta de nómina'},
    )
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

  async getAllTypeEmployee() {
    const data = await this.serviceTypeEmployee.getAll();
    data.forEach(item => {
      this.typeEmployees.push({
        label: item.description,
        value: item
      })
    });
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
    this.employee = new Employee();
    this.showModal = true;
  }

  saveSalesMan() {
    // Date formatting to database format
    this.employee.contractDate = moment(this.employee.contractDate).format('YYYY-MM-DD');

    this.employee.person.emails.forEach((item, index) => { this.employee.person.emails[index].main = item.main ? 1 : 0 });
    this.employee.person.mobilePhones.forEach((item, index) => { this.employee.person.mobilePhones[index].main = item.main ? 1 : 0 });
    this.employee.person.locations.forEach((item, index) => { this.employee.person.locations[index].main = item.main ? 1 : 0 });

    if(!this.employee.id) {
      this.employeeService.create(this.employee).pipe(first()).subscribe(
        response => {
          this.employee = response;
          this.employees.push(this.employee);
          this.messageService.add({severity: 'success', summary: '', detail: 'Empleado guardado con éxito'})
          this.showModal = false;
        },
        error =>  console.error(error)
      )
    } else {
      this.employeeService.update(this.employee.id, this.employee).pipe(first()).subscribe(
        response => {
          console.log(response);
          if(response['success']) {
            this.employees = this.employees.map( employee => {
              if(employee.id === this.employee.id) employee = this.employee
              return employee
            })
            this.showModal = false;
            this.messageService.add({ severity: 'success', summary: '', detail: 'Empleado actualizado con éxito' })
          }
        },
        error => console.error(error)
      )
    }
  }

  modifyEmployee(employee: Employee) {
    this.employee = employee;

    this.employee.person.emails.forEach( email => {
      if(this.employee.person.emails.length != this.emails.length){
        this.emails.push(this.addEmailFormGroup())
      }
    });

    this.employee.person.locations.forEach( email => {
      if(this.employee.person.locations.length != this.addresses.length){
        this.addresses.push(this.addAdressFormGroup())
      }
    });

    this.employee.person.mobilePhones.forEach( email => {
      if(this.employee.person.mobilePhones.length != this.mobilePhones.length){
        this.mobilePhones.push(this.addMobileFormGroup())
      }
    });

    this.showModal = true;
  }

  //validations Phone
  addMobile() {
    this.employee.person.mobilePhones = [...this.employee.person.mobilePhones];
    this.employee.person.mobilePhones.push(new MobilePhone());
    this.mobilePhones.push(this.addMobileFormGroup());
  }

  get mobilePhones(): FormArray {
    return this.form_salesman.get('mobilePhones') as FormArray;
  }

  addMobileFormGroup() {
    return this._formBuilder.group({
      number: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
      main: [false]
    })
  }

  deletePhone(mobile: MobilePhone, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!mobile.id) {
          this.employee.person.mobilePhones.splice(rowIndex, 1);
        } else {
          this.mobilePhoneService.delete(mobile.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.employee.person.mobilePhones = this.employee.person.mobilePhones.filter((x) => x.id != mobile.id);
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
    this.emails.push(this.addEmailFormGroup());
  }

  get emails(): FormArray {
    return this.form_salesman.get('emails') as FormArray;
  }

  addEmailFormGroup(){
    return this._formBuilder.group({
      email: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      main: [false]
    })
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
    this.addresses.push(this.addAdressFormGroup())
  }

  get addresses(): FormArray {
    return this.form_salesman.get('addresses') as FormArray;
  }

  addAdressFormGroup() {
    return this._formBuilder.group({
      city: ['',],
      address: ['',],
      neighborhood: [''],
      phoneNumber: [''],
      main: [false]
    })
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
              console.log(data);
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

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${employee.person.name} ${employee.person.surname} ${employee.person.secondSurname}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.employeeService.delete(employee.id, employee).pipe(first()).subscribe(
          data => {
            console.log(data['success']);
            if (data['success']) {
              this.employees = this.employees.filter((x) => x.id != employee.id);
              this.messageService.add({severity: 'success', summary: '', detail: 'Empleado eliminado con éxito'})
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
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
