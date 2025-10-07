import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Monedas } from '../../models/monedas';

@Injectable({
  providedIn: 'root'
})
export class FxRates {
  
  private apiUrl = 'https://api.fxratesapi.com/latest?';
  private readonly API_KEY = 'api_key=fxr_live_e422d76a3aa13b62ee8e4a0b719961ad38d1';
  
  private _moneda = signal<string>(localStorage.getItem('moneda') ?? 'USD');
  readonly modena = this._moneda.asReadonly();
    
  constructor(private http: HttpClient) {
    effect(() => {
      const moneda = this._moneda();
      localStorage.setItem('moneda', moneda);
    });

    const value = localStorage.getItem('moneda');
    if (value) this._moneda.set(value);
  }

  setMoneda(code: string) {
    this._moneda.set(code);
  }

  getRates(): Observable<Monedas> {
    return this.http.get<Monedas>(`${this.apiUrl}${this.API_KEY}`);
  }
  
  getRateByMoneda(monedas: string[], base: string): Observable<Monedas> {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('base', base.toUpperCase());

    if (monedas?.length) {
      const lista = monedas.map(m => m.toUpperCase()).join(',');
      params = params.set('currencies', lista);
    }

    return this.http.get<Monedas>(this.apiUrl, { params });
  }
}
