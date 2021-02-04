import { Component, OnInit } from '@angular/core';
import { RouteStateService } from '../../../core/services/route-state.service';
import { CategoryService } from './../../../core/services/category.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Category } from '../../../core/models/category.model'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  form_category: FormGroup;
  model: Category = new Category();

  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(
    private service: CategoryService,
    private _formuilder: FormBuilder, private routeStateService: RouteStateService,) {
    this.form_category = this._formuilder.group({
      code: ['', [Validators.required], []],
      description: ['', [Validators.required], []]
    })
  }

  ngOnInit(): void {
    this.routeStateService.add("Configuration", "/configuration/categorys", null, false);
  }

  newCategory() {
    this.showModal = true;
  }

  saveCategory() {
    // this.categoryService.create(this.model);
    console.log(this.model);
  }

  deletedCategory() { }

  modifideOCategory() { }

}
