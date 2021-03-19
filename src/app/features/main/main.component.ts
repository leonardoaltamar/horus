import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ProcessService } from '@core/services/process.service';
import { EmployeeService } from '@core/services/employee.service';
import { Article, Employee } from '@core/models';
import { Process } from '@core/models/process.model';
import * as moment from 'moment';
import { ProductionOrderService } from '@core/services/production_order.service';
import { ArticleService } from '@core/services/article.service';

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
  numberPurchasesToday: number = 0;
  numberProductsSold: number = 0;
  numberProductionOrder: number = 0;
  currentToday = moment().format('YYYY-MM-DD');
  topArticles: Article[] = []
  lastSales: Process[] = [];

  constructor(private serviceProcess: ProcessService,
        private serviceEmplooyee: EmployeeService,
        private serviceArticle: ArticleService,
        private serviceProdutionOrder: ProductionOrderService) {}

  ngOnInit(): void {
    this.getAllSalesToday();
    this.getAllPurchasesToday();
    this.dataSalesPrice = [...[...Array(12)].map(e => 0)]
    this.dataSalesPriceE = [...[...Array(12)].map(e => 0)]
    this.getSalesYear();
    this.getLastSales();
    this.getTopEmployees();
    this.getAllOrderProdution();
    this.getTopProduct();
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
      if(item.typeMoviment === 'S' && item.createdAt === this.currentToday) {
        this.numberSalesToday++;
        item.details.forEach(de => this.numberProductsSold++)
      }
    })
  }

  async getAllPurchasesToday() {
    const data = await this.serviceProcess.getAll();
    data.forEach(item => {
      if(item.typeMoviment === 'P' && item.createdAt === this.currentToday) {
        this.numberPurchasesToday++;
      }
    })
  }

  async getTopEmployees() {
    this.topEmployees= await this.serviceEmplooyee.getTop();
  }

  async getTopProduct() {
    this.topArticles = await this.serviceArticle.getTop();
  }

  async getLastSales() {
    this.lastSales = await this.serviceProcess.getLast();
  }

  async getAllOrderProdution() {
    const data = await this.serviceProdutionOrder.getAll();
    data.forEach(item => {
      if(item.createdAt === this.currentToday){
        this.numberProductionOrder++;
      }
    })
  }
}
