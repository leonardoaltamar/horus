import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Section } from '@core/models/section.model';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { RouteStateService } from '@core/services/route-state.service';
import { SectionService } from '@core/services/section.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [ConfirmationService]
})
export class SectionComponent implements OnInit {
  form_section: FormGroup;
  section: Section = new Section();
  sections: Section[] = [];

  constructor(
    private _routeStateService: RouteStateService,
    private _sectionService: SectionService,
    private _fB: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _messageServices: MessageService
  ) {
    this.form_section = _fB.group({
      code: ['', Validators.required, Validators.min(3), Validators.max(6)],
      name: ['', Validators.required, Validators.min(3), Validators.max(60)],
      icon: [''],
      path: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this._routeStateService.add(
      'Configuration',
      '/configuration/sections',
      null,
      false
    );
    this.getAllSections();
  }

  //cargar todos los registros
  async getAllSections() {
    try {
      this.sections = await this._sectionService.getAll();
      console.log(this.sections);
    } catch (error) {
      console.error(error);
    }
  }
}
