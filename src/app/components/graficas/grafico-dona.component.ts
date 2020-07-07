import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input() graficas: any[] = [];

  leyenda = 'leyenda';
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {
  }

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.doughnutChartLabels = this.graficas['labels'];
    // tslint:disable-next-line: no-string-literal
    this.doughnutChartData = this.graficas['data'];
    // tslint:disable-next-line: no-string-literal
    this.leyenda = this.graficas['leyenda'];
  }

}
