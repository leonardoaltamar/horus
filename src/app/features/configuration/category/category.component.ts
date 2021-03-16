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
      code: ['', [Validators.required], [this.validate_category.bind(this)]],
      description: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Category", "/configuration/categories", null, false);
    this.getAllCategory();
  }

  async validate_category(control: AbstractControl) {
    const val = control.value;
    const response = await this.categoryService.getAll();
    if (this.model.id) {
      return null;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].code == val) {
          return { A: true }
        }
      }
    }
  }

  newCategory() {
    this.model = new Category();
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
          this.models.push(this.model);
          this.messageService.add({ severity: 'success', summary: `Categoría creada con éxito`, detail: `Code: ${data.code} Description: ${data.description}` });
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
            this.messageService.add({ severity: 'success', summary: `Categoría actualizada con éxito` });
          }
        }
      )
    }
    this.showModal = false;
  }

  modifyCategory(category: Category) {
    this.model = category;
    this.showModal = true;
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
              this.messageService.add({ severity: 'success', summary: 'Categoría Eliminada con éxito' });
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
