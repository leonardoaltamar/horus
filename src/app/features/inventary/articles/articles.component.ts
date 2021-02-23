import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs/operators';

//models
import { Article } from '@core/models/article.model';
import { RawMaterial } from '@core/models/raw-material.model';
import { Category } from '@core/models/category.model';

//services
import { CategoryService } from '@core/services/category.service';
import { ArticleService } from '@core/services/artitle.service';
import { RawMaterialService } from '@core/services/raw-material.service';
import { MeasurementService } from '@core/services/measurement.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ConfirmationService]
})

export class ArticlesComponent implements OnInit {
  form_product: FormGroup;
  isLoading: boolean = false;
  showModal: boolean = false;
  checked: boolean = false;
  cost: string = '$00.0'


  //Modelos
  article: Article = new Article();
  articles: Article[] = [];
  rawMaterials: RawMaterial[] = [];
  categories: SelectItem[] = [];
  measurements: SelectItem[] = [];

  constructor(private routeStateService: RouteStateService,
    private _formuilder: FormBuilder,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private rawMaterialService: RawMaterialService,
    private confirmationService: ConfirmationService,
    private measurementService: MeasurementService,
    private messageService: MessageService,
  ) {
    this.form_product = this._formuilder.group({
      code: ['', [Validators.required], [this.validate_articles.bind(this)]],
      name: ['', [Validators.required], []],
      stock: ['', [Validators.required], []],
      unitValue: [''],
      category: ['', [Validators.required], []],
      expeditionDate: [],

      materials: this._formuilder.array([this._formuilder.group({
        description: [''],
        measurement: [],
        quantity: [''],
        main: [false]
      })])
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/products", null, false);
    this.getAllArticles();
    this.getAllCategory();
    this.getAllMeasurement();
  }

  newProduct() {
    this.article = new Article();
    this.form_product.reset();
    this.showModal = true;
  }

  //Guardar material
  saveArtitle() {
    if (!this.article.id) {
      this.articleService.create(this.article).subscribe(
        data => {
          console.log(this.article);
          this.article = data;
          this.articles.push(this.article);
          this.messageService.add({ severity: 'success', summary: `producto creada con éxito`, detail: `Nombre: ${this.article.name}` });
        },
        error => {
          console.error(`Error de guardado ${error}`);
        }
      );
    } else {
      this.articleService.update(this.article.id, this.article).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.articles = this.articles.map(x => {
              if (x.id == this.article.id)
                x = this.article;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Producto actualizado con exito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyProduct(dataRow: Article) {
    this.article = dataRow;
    this.showModal = true;
  }

  deleteProduct(article: Article) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${article.name}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.articleService.delete(article.id, article).pipe(first()).subscribe(
          data => {
            console.log(data['success']);
            if (data['success']) {
              this.messageService.add({ severity: 'success', summary: `producto borrado con éxito`, detail: `producto: ${article.name} ` });
              this.articles = this.articles.filter((x) => x.id != article.id);
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  //validations rawMaterials
  addRow() {
    this.rawMaterials = [...this.rawMaterials];
    this.rawMaterials.push(new RawMaterial());
    this.materials.push(this._formuilder.group({
      description: [''],
      measurement: [],
      quantity: [''],
      main: [false]
    }))
  }
  get materials(): FormArray {
    return this.form_product.get('materials') as FormArray;
  }

  deleteRow(row: RawMaterial, rowIndex: number) {
    if (!row.id) {
      this.rawMaterials.splice(rowIndex, 1);
    } else {
      this.rawMaterialService.delete(row.id).pipe(first()).subscribe(
        data => {
          if (data['success']) {
            this.rawMaterials = this.rawMaterials.filter((x) => x.id != row.id);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  async getAllCategory() {
    try {
      this.isLoading = true;
      let data = await this.categoryService.getAll();
      data.forEach(item => {
        this.categories.push({ value: item, label: item.description })
      })
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
        this.measurements.push({ value: item, label: item.description })
      })
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  async getAllArticles() {
    try {
      this.isLoading = true;
      this.articles = await this.articleService.getAll();
      console.log(this.articles);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }

  async validate_articles(control: AbstractControl) {
    const val = control.value;
    const response = await this.articleService.getAll();
    if (this.article.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code = val) {
          return { A: true }
        }
      }
    }
    return null;
  }

}