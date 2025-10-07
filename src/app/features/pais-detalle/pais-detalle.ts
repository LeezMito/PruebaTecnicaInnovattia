import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CountriesService } from '../../core/services/rest-countries/rest-countries';
import { ActivatedRoute } from '@angular/router';
import { MonedaPais, Pais } from '../../core/models/pais';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FxRates } from '../../core/services/fx-rates/fx-rates';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pais-detalle',
  imports: [CommonModule],
  templateUrl: './pais-detalle.html',
  styleUrl: './pais-detalle.sass'
})
export class PaisDetalle implements OnInit {
  code: string = "";
  pais!: Pais;
  signals = inject(FxRates);
  monedaSeleccionada: string ="";

  constructor(
    private readonly countriesService: CountriesService,
    private readonly fxRates: FxRates,
    private readonly route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
    this.monedaSeleccionada = this.signals.modena();
    this.getDetallePais();
  }
  
  getDetallePais() {
    this.countriesService.getPaisByCode(this.code).subscribe({
      next: resp=>{
        this.pais = resp;
        const codigos = Object.keys(this.pais?.currencies ?? {});
        if (codigos.length) {
          this.actualizarCambios(codigos, this.monedaSeleccionada);
        }else {
          this.toastr.info('Este país no declara monedas para mostrar.', 'Sin monedas');
        }
      },
      error: err=>{
        const msg = err?.error?.message || 'No pudimos cargar los datos del país.';
        const title = err?.status ? `Error ${err.status}` : 'Error';
        this.toastr.error(msg, title, { timeOut: 6000 });
      }
    })
  }

  private actualizarCambios(codigos: string[], base: string) {
    this.fxRates.getRateByMoneda(codigos, base).subscribe({
      next: (resp) => {
        if (!resp?.success || !resp.rates) return;

        for (const code of codigos) {
          const entry = this.pais.currencies?.[code];
          if (!entry) continue;

          if (code.toUpperCase() === base.toUpperCase()) {
            entry.cambio = 1; 
            continue;
          }

          const rate = resp.rates[code]; 
          entry.cambio = (typeof rate === 'number' && rate > 0)
            ? +(1 / rate).toFixed(6)    
            : 0;
        }
      },
      error: (err) => {
        const msg = err?.error?.message || 'No pudimos obtener tasas de cambio.';
        const title = err?.status ? `Error ${err.status}` : 'Error';
        this.toastr.error(msg, title, { timeOut: 6000 });
      },
    });
  }

  public sanitizeMapUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
