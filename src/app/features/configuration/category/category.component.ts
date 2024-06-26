import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { CategoryService } from '@core/services/category.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Category } from '@core/models/category.model'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ConfirmationService]
})

export class CategoryComponent {
  form_category: FormGroup;
  model: Category = new Category();
  models: Category[] = [];

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private _formuilder: FormBuilder,
    private routeStateService: RouteStateService,
    private messageService: MessageService) {
    this.form_category = this._formuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Category", "/configuration/categories", null, false);
    this.getAllCategory();
  }


  newCategory() {
    this.model = new Category();
    this.showModal = true;
  }

  modifyCategory(category: Category) {
    this.model = category;
    this.showModal = true;
  }

  async getAllCategory() {
    try {
      this.isLoading = true;
      this.models = await this.categoryService.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  saveCategory() {
    if (!this.model.id) {
      this.categoryService.create(this.model).subscribe(
        data => {
          if (data['errno']) {
            this.messageService.add({ severity: 'error', summary: 'Dato duplicado', detail: data['sqlMessage'] });
          }else{
            this.model = data;
            this.models.push(this.model);
            this.messageService.add({ severity: 'success', summary: `Categoria creada con éxito`, detail: `Code: ${data.code} Name: ${data.description}` });
          }

        },
        error => {
          this.messageService.add({ severity: 'info', summary: `Error de guardado`, detail: error });
        }
      );
    }
    else {
      this.categoryService.update(this.model.id, this.model).pipe(first()).subscribe(
        data => {
          if (data['success']) {
              this.models = this.models.map(x => {
              if (x.id == this.model.id)
                x = this.model;
              return x
            });
            this.messageService.add({ severity: 'success', summary: `Categoria actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }


  deletedCategory(category: Category) {
    this.confirmationService.confirm({
      header: 'Alerta',
      message: `Está eliminando: ${category.code} - ${category.description}`,
      icon: 'fas fa-exclamation-triangle',
      accept: () => {
        this.categoryService.delete(category.id, category).pipe(first()).subscribe(
          data => {
            if (data['success']) {
              this.models = this.models.filter((x) => x.id != category.id);
              this.messageService.add({ severity: 'success', summary: 'Categoria Eliminada con éxito' });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
