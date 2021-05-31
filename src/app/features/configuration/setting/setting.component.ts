import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { SettingService } from '@core/services/setting.service';
import { Component } from '@angular/core';
import { RouteStateService } from '@core/services/route-state.service';
import { TypeEmployeeService } from '@core/services/type-employee.service';
import { Setting } from '@core/models/setting.model';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent {

  model: Setting = new Setting();
  typeEmployes: SelectItem[] = [];


  constructor(private routeStateService: RouteStateService,
              private service: SettingService,
              private serviceTypeEmployee: TypeEmployeeService){}
  ngOnInit(): void {
    this.routeStateService.add('Configuración', '/configuration/settings', null, false);
    this.getConfiguration();
    this.getAllTypeEmployess();
  }

  async getAllTypeEmployess() {
    const data = await this.serviceTypeEmployee.getAll();
    data.forEach(item => {
      this.typeEmployes.push({
        label: item.description,
        value: item.id
      })
    })
  }

  async getConfiguration() {
    this.model = await this.service.get();
    console.log(this.model);
  }

  save() {
    if(!this.model.id) {
      this.service.create(this.model).pipe(first()).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.error(error);
        }
      )
    }
  }
}
