import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ProcessService } from '@core/services/process.service';
import { EmployeeService } from '@core/services/employee.service';
import { Employee } from '@core/models';
import { Process } from '@core/models/process.model';
import * as moment from 'moment';
import { ProductionOrderService } from '@core/services/production_order.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataSalesPrice: Array<number> = [];
  dataSalesPriceE: Array<number> = [];
  isLoading: boolean = false;
  topEmployees: Employee[] = [];
  numberSalesToday: number = 0;
  numberProductsSold: number = 0;
  numberProductionOrder: number = 0;
  today = moment().format('YYYY-MM-DD');

  constructor(private serviceProcess: ProcessService,
        private serviceEmplooyee: EmployeeService,
        private serviceProdutionOrder: ProductionOrderService) {}

  ngOnInit(): void {
    this.getAllSalesToday();
    this.dataSalesPrice = [...[...Array(12)].map(e => 0)]
    this.dataSalesPriceE = [...[...Array(12)].map(e => 0)]
    this.getSalesYear();
    this.getTopEmployees();
    this.getAllOrderProdution();
  }

  async getSalesYear() {
    this.isLoading = true;
    const data = await this.serviceProcess.getAllByYear('S');
    data.forEach(item => {
      const date  = new Date(item.dateInvoice);
      const month = date.getMonth();
      if(item.state === 'P'){
        this.dataSalesPrice[month] = this.dataSalesPrice[month] + item.total;
      }

      if(item.state === 'E'){
        this.dataSalesPriceE[month] = this.dataSalesPriceE[month] + item.total;
      }
    })
    this.chartOptions = {
      series: [
        {
          name: "Pagadas",
          data: this.dataSalesPrice,

        },
        {
          name: "Pendientes",
          data: this.dataSalesPriceE
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        tickAmount: 8,
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.isLoading = false
  }

  async getAllSalesToday() {
    const data = await this.serviceProcess.getAll();
    data.forEach(item => {
      if(item.typeMoviment === 'S' && item.createdAt === this.today) {
        this.numberSalesToday++;
        item.details.forEach(de => this.numberProductsSold++)
      }
    })
  }

  async getTopEmployees() {
    this.topEmployees= await this.serviceEmplooyee.getTop();
  }

  async getAllOrderProdution() {
    const data = await this.serviceProdutionOrder.getAll();
    data.forEach(item => {
      if(item.createdAt === this.today){
        this.numberProductionOrder++;
      }
    })
  }
}
