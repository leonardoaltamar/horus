import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

//models
import { RawMaterial } from '@core/models/raw-material.model';

//services
import { CategoryService } from '@core/services/category.service';
import { RawMaterialService } from '@core/services/raw-material.service';
import { MeasurementService } from '@core/services/measurement.service';

@Component({
  selector: 'app-row-materials',
  templateUrl: './row-material.component.html',
  styleUrls: ['./row-material.component.css'],
  providers: [ConfirmationService]
})

export class RawMaterialComponent implements OnInit {
  form_row_material: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  checked: boolean = false;
  //Modelos
  model: RawMaterial = new RawMaterial();
  rowMaterials: RawMaterial[] = [];
  categories: SelectItem[] = [];
  measurements: SelectItem[] = [];

  constructor(private service: RawMaterialService,
    private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private measurementService: MeasurementService,
    private messageService: MessageService,
  ) {
    this.form_row_material = this._formuilder.group({
      code: ['', [Validators.required], [this.validate_articles.bind(this)]],
      name: ['', [Validators.required], []],
      stock: ['', [Validators.required], []],
      unitValue: [''],
      category: ['', [Validators.required], []],
      measurement: ['', [Validators.required], []],
      expeditionDate: [],
    });
  }

  ngOnInit(): void {
    this.routeStateService.add("Materia prima", "/inventary/raw_materials", null, false);
    this.getAllRawMaterials();
    this.getAllCategory();
    this.getAllMeasurement();
  }

  async getAllRawMaterials() {
    try {
      this.isLoading = true;
      this.rowMaterials = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  async getAllCategory() {
    try {
      this.isLoading = true;
      let data = await this.categoryService.getAll();
      data.forEach(item => {
        this.categories.push({ value: item.id, label: item.description });
      });
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  async getAllMeasurement() {
    try {
      this.isLoading = true;
      let data = await this.measurementService.getAll();
      data.forEach(item => {
        this.measurements.push({ value: item.id, label: item.description });
      });
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  newRawMaterial() {
    this.model = new RawMaterial();
    this.form_row_material.reset();
    this.showModal = true;
  }

  saveRawMaterial() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          this.model = data;
          this.rowMaterials.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Materia prima creada con éxito`, detail: `Nombre: ${this.model.name}` });
        },
        error => console.error(`Error de guardado ${error}`)
      );
    } else {
      this.service.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.rowMaterials = this.rowMaterials.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x;
            });
            this.messageService.add({ severity: 'success', summary: `Materia prima actualizada con exito` });
          }
        }
      );
    }
    this.showModal = false;
  }

  modifyRawMaterial(rawMaterial: RawMaterial) {
    this.model = rawMaterial;
    this.showModal = true;
  }

  deleteRawMaterial(rawMaterial: RawMaterial) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${rawMaterial.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.service.delete(rawMaterial.id, rawMaterial).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.messageService.add({ severity: 'success', summary: `Materia prima eliminada con éxito`, detail: `nombre: ${rawMaterial.name} ` });
              this.rowMaterials = this.rowMaterials.filter((x) => x.id != rawMaterial.id);
            }
          },
          error => console.log(error)
        );
      }
    });
  }

  async validate_articles(control: AbstractControl) {
    const val = control.value;
    const response = await this.service.getAll();
    if (this.model.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true };
        }
      }
    }
    return null;
  }
}
