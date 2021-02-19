import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

//Models
import { SalesMan } from '@core/models/salesMan.model';
import { City } from '@core/models/city.model';
import { Location } from '@core/models/location.model';

//Services
import { PersonService } from '@core/services/person.service';
import { SalesManService } from '@core/services/sales-man.service';
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';
import { Email } from '@core/models/email.model';
import { MobilePhone } from '@core/models/mobilePhone.model';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.css'],
  providers: [ConfirmationService]
})
export class SalesmanComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  form_salesman: FormGroup;

  //Customer
  salesMan: SalesMan = new SalesMan();
  salesMen: SalesMan[] = [];
  cities: City[] = [];
  gender: SelectItem[] = [];
  document: SelectItem[] = [];
  imageUrl: any;

  city: { name: string }[];

  constructor(private routeStateService: RouteStateService,
    private confirmationService: ConfirmationService,
    private salesManService: SalesManService,
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
    this.routeStateService.add("Configuration", "/configuration/salesmen", null, false);
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
    this.salesMan.person.emails.forEach((item, index) => { this.salesMan.person.emails[index].main = item.main ? 1 : 0 });
    this.salesMan.person.mobilesPhones.forEach((item, index) => { this.salesMan.person.mobilesPhones[index].main = item.main ? 1 : 0 });
    this.salesMan.person.locations.forEach((item, index) => { this.salesMan.person.locations[index].main = item.main ? 1 : 0 });
    if (!this.salesMan.id) {
      this.salesManService.create(this.salesMan).pipe(first()).subscribe(
        data => {
          console.log(" 1 ", this.salesMan.person.mobilesPhones);
          console.log(data);
          console.log(this.salesMan);
          this.salesMan = data;
          console.log(" 2 ", this.salesMan.person.mobilesPhones);
          this.salesMen.push(this.salesMan);
          this.messageService.add({
            severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${this.salesMan.person.documentNumber}
          Nombre: ${this.salesMan.person.name} ${this.salesMan.person.surname}`
          });
          this.showModal = false;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.salesManService.update(this.salesMan.id, this.salesMan).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.salesMen = this.salesMen.map(x => {
              if (x.id == this.salesMan.id)
                x = this.salesMan;
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
  addMobile() {
    this.salesMan.person.mobilesPhones = [...this.salesMan.person.mobilesPhones];
    this.salesMan.person.mobilesPhones.push(new MobilePhone());
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
          this.salesMan.person.mobilesPhones.splice(rowIndex, 1);
        } else {
          this.mobilePhoneService.delete(mobile.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.salesMan.person.mobilesPhones = this.salesMan.person.mobilesPhones.filter((x) => x.id != mobile.id);
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
    this.salesMan.person.emails = [...this.salesMan.person.emails];
    this.salesMan.person.emails.push(new Email());
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
          this.salesMan.person.emails.splice(rowIndex, 1);
        } else {
          this.emailService.delete(email.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.salesMan.person.emails = this.salesMan.person.emails.filter((x) => x.id != email.id);
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
    this.salesMan.person.locations = [...this.salesMan.person.locations];
    this.salesMan.person.locations.push(new Location());
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
          this.salesMan.person.locations.splice(rowIndex, 1);
        } else {
          this.locationService.delete(row.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.salesMan.person.locations = this.salesMan.person.locations.filter((x) => x.id != row.id);
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
    const response = await this.salesManService.getAll();
    if (this.salesMan.id) {
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
      this.salesMen = await this.salesManService.getAll();
      console.log(this.salesMen);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

}
