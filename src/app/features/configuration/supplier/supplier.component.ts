import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService, SelectItem } from 'primeng/api';

//Models
import { City } from '@core/models/city.model';
import { Location } from '@core/models/location.model';
import { Supplier } from '@core/models/supplier.model'

//Services
import { SupplierService } from '@core/services/supplier.service'
import { TypeSupplierService } from '@core/services/typeSupplier.service';
import { PersonService } from '@core/services/person.service';
import { CityService } from '@core/services/city.service';
import { LocationService } from '@core/services/location.service';
import { EmailService } from '@core/services/email.service';
import { MobilePhoneService } from '@core/services/mobile_phone.service';
import { GerderService } from '@core/services/gerder.service';
import { Email } from '@core/models/email.model';
import { MobilePhone } from '@core/models/mobilePhone.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [ConfirmationService]
})
export class SupplierComponent implements OnInit {
  form_supplier: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;

  //Supplier
  supplier: Supplier = new Supplier();
  suppliers: Supplier[] = [];
  typeSupplier: SelectItem[] = [];
  documentType: SelectItem[] = [];
  gender: SelectItem[] = [];
  cities: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private typeSupplierService: TypeSupplierService,
    private personService: PersonService,
    private cityService: CityService,
    private messageService: MessageService,
    private locationService: LocationService,
    private emailService: EmailService,
    private mobilePhoneService: MobilePhoneService,
    private gerderService: GerderService,
    private _formBuilder: FormBuilder) {
    this.form_supplier = this._formBuilder.group({
      typeDocument: ['', [Validators.required]],
      document: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern(/^([0-9])*$/)], [this.validate_document.bind(this)]],
      expeditionCity: [''],
      birthDate: [''],
      gender: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      surName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z ])*$/)]],
      secondSurname: [''],
      typeSupplier: [''],

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
      })]),

      businesNit: [''],
      businesName: [''],
      businesDane: ['']

    });
  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/suppliers", null, false);
    this.getCitiesGenderDocument();
    this.getSupplier();
  }

  newSupplier() {
    this.supplier = new Supplier;
    this.showModal = true;
  }

  saveSupplier() {
    this.supplier.person.emails.forEach((item, index) => { this.supplier.person.emails[index].main = item.main ? 1 : 0 });
    this.supplier.person.mobilePhones.forEach((item, index) => { this.supplier.person.mobilePhones[index].main = item.main ? 1 : 0 });
    this.supplier.person.locations.forEach((item, index) => { this.supplier.person.locations[index].main = item.main ? 1 : 0 });
    if (!this.supplier.id) {
      this.supplierService.create(this.supplier).pipe(first()).subscribe(
        data => {
          console.log(this.supplier)
          this.supplier = data;
          console.log(data)
          this.suppliers.push(this.supplier);
          this.messageService.add({
            severity: 'success', summary: `Departamento creada con éxito`, detail: `Code: ${data.person.documentNumber}
          Nombre: ${data.person.name} ${data.person.surname}`
          });
          this.showModal = false;
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.supplierService.update(this.supplier.id, this.supplier).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.suppliers = this.suppliers.map(x => {
              if (x.id == this.supplier.id)
                x = this.supplier;
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

  modifySupplier(supplier: Supplier) {
    this.supplier = supplier;
    this.showModal = true;
  }

  deleteSupplier(supplier: Supplier) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${supplier.person.name} ${supplier.person.surname} ${supplier.person.secondSurname}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.supplierService.delete(supplier.id, supplier).pipe(first()).subscribe(
          data => {
            console.log(data['success']);
            if (data['success']) {
              this.suppliers = this.suppliers.filter((x) => x.id != supplier.id);
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
  addMobile() {
    this.supplier.person.mobilePhones = [...this.supplier.person.mobilePhones];
    this.supplier.person.mobilePhones.push(new MobilePhone());
    this.mobilePhones.push(this._formBuilder.group({
      number: ['', [Validators.pattern(/^([0-9])*$/), Validators.minLength(7), Validators.maxLength(10)]],
      main: [false]
    }));
  }

  get mobilePhones(): FormArray {
    return this.form_supplier.get('mobilePhones') as FormArray;
  }

  deletePhone(mobile: MobilePhone, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este telefono?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!mobile.id) {
          this.supplier.person.mobilePhones.splice(rowIndex, 1);
        } else {
          this.mobilePhoneService.delete(mobile.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.supplier.person.mobilePhones = this.supplier.person.mobilePhones.filter((x) => x.id != mobile.id);
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
    this.supplier.person.emails = [...this.supplier.person.emails];
    this.supplier.person.emails.push(new Email());
    this.emails.push(this._formBuilder.group({
      email: ['', [Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      main: [false]
    }));
  }
  get emails(): FormArray {
    return this.form_supplier.get('emails') as FormArray;
  }

  deleteEmail(email: Email, rowIndex: number) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `¿Estas seguro que deseas eliminar este correo?`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        if (!email.id) {
          this.supplier.person.emails.splice(rowIndex, 1);
        } else {
          this.emailService.delete(email.id).pipe(first()).subscribe(
            data => {
              if (data['success']) {
                this.supplier.person.emails = this.supplier.person.emails.filter((x) => x.id != email.id);
              }
            },
            error => {
              console.log(error);
            });
        }
      }
    });
  }

  //validations Document Student
  async validate_document(control: AbstractControl) {
    const val = control.value;
    const response = await this.supplierService.getAll();
    if (this.supplier.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].person.documentNumber == val) {
          return { A: true };
        }
      }
    }
  }

  async getSupplier() {
    try {
      this.isLoading = true;
      this.suppliers = await this.supplierService.getAll();
      console.log(this.suppliers)
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  getCitiesGenderDocument() {
    this.cityService.getAll().then(data => {
      data.forEach(x =>
        this.cities.push({
          label: x.name,
          value: x
        })
      )
    });

    this.gerderService.getAll().then(data =>
      data.forEach(x =>
        this.gender.push({
          label: x.name,
          value: x
        })
      )
    );

    this.documentType.push(
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

    this.typeSupplierService.getAll().then(data =>
      data.forEach(x =>
        this.typeSupplier.push({
          label: x.description,
          value: x
        })
      )
    );
  }

}
