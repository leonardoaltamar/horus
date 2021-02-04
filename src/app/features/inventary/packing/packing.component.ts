import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';

import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {PackingService } from '../../../core/services/packing.service';
@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})

export class PackingComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;

  constructor(private routeStateService: RouteStateService,
             private service: PackingService
    ) { }

  ngOnInit(): void {
    this.routeStateService.add("Productos", "/inventary/packings", null, false);
  }

  newPacking() {
    this.showModal = true;
  }

  //Metodo de recarga de informacion
  async getAllAcademicFields() {
    try {
      this.isLoading = true;
      // this.academicFields = await this.service.getAll();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error)
    }
  }
}
