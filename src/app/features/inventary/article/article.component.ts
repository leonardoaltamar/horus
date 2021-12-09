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
import { ArticleService } from '@core/services/article.service';
import { MeasurementService } from '@core/services/measurement.service';
import { LienService } from '@core/services/lien.service';
import { FileService } from '@core/services/file.service';
import { Article } from '@core/models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ConfirmationService]
})
export class ArticleComponent implements OnInit {
  form_row_material: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  checked: boolean = false;
  //Modelos
  model: Article = new Article();
  rowMaterials: Article[] = [];
  categories: SelectItem[] = [];
  measurements: SelectItem[] = [];
  liens: SelectItem[] = [];
  isLoadingFile: boolean = false;

  constructor(private service: ArticleService,
    private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private lienService: LienService,
    private confirmationService: ConfirmationService,
    private measurementService: MeasurementService,
    private messageService: MessageService,
    private serviceFile: FileService
  ) {
    this.form_row_material = this._formuilder.group({
      code: ['', [Validators.required], []],
      name: ['', [Validators.required], []],
      description: ['', [Validators.required]],
      unitValue: [''],
      category: ['', [Validators.required], []],
      lien:['', [Validators.required], []],
      expeditionDate: [],
      stockLimit: []
    });
  }

  ngOnInit(): void {
    this.routeStateService.add("Articulos", "/inventary/articles", null, false);
    this.getAllRawMaterials();
    this.getAllCategory();
    this.getAllMeasurement();
    this.getAllLiens();
  }

  async getAllRawMaterials() {
    try {
      this.isLoading = true;
      this.rowMaterials = await this.service.getAll();
      console.log(this.rowMaterials);
      this.rowMaterials = this.rowMaterials.filter(article => article.rawMaterials.length === 0);
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

  async getAllLiens() {
    this.isLoading = true;
    const response = await this.lienService.getAll()
    response.forEach(lien => {
      this.liens.push({
        label: lien.name,
        value: lien
      })
    })
  }

  async onFileChanged(event: any) {
    try {
      this.isLoadingFile = true;
      const file = event.target.files[0];
      const res = await this.serviceFile.uploadFile(file);
      const url: string = res['url']
      this.model.imageUrl = url;
      this.isLoadingFile = false;
    } catch (error) {
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
    this.model = new Article();
    this.form_row_material.reset();
    this.showModal = true;
  }

  saveRawMaterial() {
    if (!this.model.id) {
      this.service.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: data['sqlMessage'], detail: `Nombre: ${this.model.name}` });
          }else{
            this.model = data;
            this.rowMaterials.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Materia prima creada con éxito`, detail: `Nombre: ${this.model.name}` });
          }
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

  modifyRawMaterial(rawMaterial: Article) {
    this.model = rawMaterial;
    this.showModal = true;
  }

  deleteRawMaterial(rawMaterial: Article) {
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
}
