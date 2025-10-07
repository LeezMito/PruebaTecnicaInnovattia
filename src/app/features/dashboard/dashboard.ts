import { CountriesService } from './../../core/services/rest-countries/rest-countries';
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { Pais } from '../../core/models/pais';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.sass',
})
export class Dashboard implements OnInit {
  distribucionChartData: ChartData<'bar'> = { labels: [], datasets: [{ label: 'Pises', data: [] }] };
  distribucionChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } },
  };

  poblacionChartData: ChartData<'bar'> = { labels: [], datasets: [{ label: 'Población', data: [] }] };
  poblacionChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { y: { 
      beginAtZero: true,
      ticks: {
        callback: (value) => this.formatNumber(Number(value)),
      },
    } },
    plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } },
  };

  constructor(
    private countriesService: CountriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPaises();
  }

  getPaises() {
    this.countriesService.getPaisesParaDashboard().subscribe({
      next: (resp) => {
        this.buildGraficaDistribucion(resp);
        this.buildGraficaPoblacion(resp);

        if (Array.isArray(resp) && resp.length) {
          this.toastr.success(`Datos de ${resp.length} países`, 'Gráficas actualizadas');
        } else {
          this.toastr.warning('No hay datos para graficar', 'Sin datos');
        }
      },
      error: (err) => {
        const msg = err?.error?.message || 'No pudimos cargar los datos del dashboard.';
        const title = err?.status ? `Error ${err.status}` : 'Error';
        this.toastr.error(msg, title, { timeOut: 6000 });
      },
    });
  }
  buildGraficaPoblacion(paises: Pais[]) {
    const top10 = paises
      .filter(p => p.population)
      .sort((a, b) => b.population - a.population)
      .slice(0, 10);
    const labels = top10.map(p => p.name.common);
    const data = top10.map(p => p.population);
    this.poblacionChartData = { labels,  datasets: [{ label: 'Población', data}] };
  }

  private buildGraficaDistribucion(paises: Pais[]) {
    const regiones = new Map<string, number>();
    for (const pais of paises) {
      const region = pais.region?.trim() || '';
      regiones.set(region, (regiones.get(region) ?? 0) + 1);
    }
    const labels = Array.from(regiones.keys());
    const data = Array.from(regiones.values());
    this.distribucionChartData = { labels, datasets: [{ label: 'Pises', data }] };
  }
  private formatNumber(num: number): string {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  }
}
