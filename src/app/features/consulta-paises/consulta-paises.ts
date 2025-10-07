import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pais } from '../../core/models/pais';
import { CountriesService } from '../../core/services/rest-countries/rest-countries';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta-paises',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consulta-paises.html',
  styleUrl: './consulta-paises.sass',
})
export class ConsultaPaises {
  paises: Pais[] = [];
  paisesFiltrados: Pais[] = [];
  displayFilters = signal(false);
  paisFiltro = '';
  regionFiltro = '';
  idiomaFiltro = '';
  regiones: string[] = [];
  idiomas: string[] = [];

  constructor(
    private readonly countriesService: CountriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPaises();
  }

  private getPaises(): void {
  this.countriesService.getPaises().subscribe({
    next: (data) => {
      this.paises = data;
      this.aplicarFiltros();

      if (Array.isArray(data) && data.length) {
        this.toastr.success(`Se cargaron ${data.length} países`, 'Listo');
      } else {
        this.toastr.warning('No se encontraron países', 'Sin datos');
      }
    },
    error: (err) => {
      const msg = err?.error?.message || 'No pudimos cargar los países. Intenta de nuevo.';
      const title = err?.status ? `Error ${err.status}` : 'Error';
      this.toastr.error(msg, title, { timeOut: 6000 });
    },
  });
  }

  private initFiltros() {
    const regiones = new Set<string>(
      this.paises.map((p) => p?.region || '').filter(Boolean)
    );
    const idiomas = new Set<string>(
      this.paises.flatMap((p) => Object.values(p?.languages ?? {})).filter(Boolean)
    );
    if (this.regionFiltro) regiones.add(this.regionFiltro);
    if (this.idiomaFiltro) idiomas.add(this.idiomaFiltro);
    this.regiones = Array.from(regiones).sort((a, b) => a.localeCompare(b));
    this.idiomas = Array.from(idiomas).sort((a, b) => a.localeCompare(b));
  }

  public toggleFiltros(): void {
    this.displayFilters.update((displayFilters) => !displayFilters);
  }

  public onBuscarPais(event: Event): void {
    this.paisFiltro = (event.target as HTMLInputElement).value;
    this.aplicarFiltros();
  }

  public onRegionSeleccion(event: Event): void {
    this.regionFiltro = (event.target as HTMLSelectElement).value;
    this.aplicarFiltros();
  }

  public onIdiomaSeleccion(event: Event): void {
    this.idiomaFiltro = (event.target as HTMLSelectElement).value;
    this.aplicarFiltros();
  }

  public aplicarFiltros(): void {
    const paisFiltro = this.normalizar(this.paisFiltro);
    const regionFiltro = this.normalizar(this.regionFiltro);
    const idiomaFiltro = this.normalizar(this.idiomaFiltro);

    this.paisesFiltrados = this.paises.filter((p) => {
      const nombre = this.normalizar(p?.name?.common);
      const region = this.normalizar(p?.region);
      const lenguaje = this.normalizar(Object.values(p?.languages ?? {})[0] ?? '');
      const byName = nombre.includes(paisFiltro);
      const byRegion = !regionFiltro || regionFiltro === region;
      const byLang = !idiomaFiltro || lenguaje.includes(idiomaFiltro);
      return byName && byRegion && byLang;
    });

    this.initFiltros();
  }

  public limpiarFiltros(): void {
    this.paisFiltro = '';
    this.regionFiltro = '';
    this.idiomaFiltro = '';
    this.aplicarFiltros();
  }

  private normalizar(texto?: string): string {
    return (texto ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}


