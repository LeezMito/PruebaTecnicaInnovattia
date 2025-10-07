import { Monedas } from './../../core/models/monedas';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FxRates } from '../../core/services/fx-rates/fx-rates';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.sass'
})
export class Header {

  signals = inject(FxRates);
  monedas: Monedas = { success: false, rates: {} };

  constructor(private fxRates: FxRates){}

  ngOnInit(): void {
    this.fxRates.getRates().subscribe({
      next: resp => {
        if(resp.success){
          this.monedas.rates = resp.rates;
        }
      }
    });
  }

  onCurrencyChange(event: Event) {
    this.signals.setMoneda(
      (event.target as HTMLSelectElement).value
    );
  }
}
