import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { ContratService } from '../../../../services/contrat.service';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-repartition-types',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './repartition-types.component.html',
  styleUrls: ['./repartition-types.component.css']
})
export class RepartitionTypesComponent implements OnInit {
  pieChartType: 'pie' = 'pie';

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Travaux', 'Prestation', 'Continue'],
    datasets: [{
      data: [],
      backgroundColor: ['#4fc3f7', '#0288d1', '#01579b'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: 'white',
        font: {
          weight: 'bold',
          size: 14
        },
       formatter: (value: number, context) => {
  const rawData = context.chart.data.datasets[0].data as number[];
  const total = rawData.reduce((a, b) => a + b, 0);

  // ⚠️ recalcul du pourcentage précis basé sur total
  const precisePercentage = (value / total) * 100;

  return `${Math.round(precisePercentage)}%`; // ✅ arrondi classique
}
      }
    }
  };

  constructor(private contratService: ContratService) {}

ngOnInit(): void {
  this.contratService.getPourcentageParType().subscribe({
    next: (data) => {
      const valeurs = [
        parseFloat(data['travaux']?.replace('%', '') ?? '0'),
        parseFloat(data['prestation']?.replace('%', '') ?? '0'),
        parseFloat(data['continue']?.replace('%', '') ?? '0')
      ];

      this.pieChartData.datasets[0].data = valeurs;
      this.pieChartData = { ...this.pieChartData }; // force refresh
    },
    error: (err) => console.error('Erreur API pourcentage', err)
  });
}


}
