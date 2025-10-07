import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pais } from '../../models/pais';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/';
    
  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    const fields = [
      'name',
      'flags',
      'region',
      'languages',
      'cca3',
    ].join(',');
    return this.http.get<Pais[]>(`${this.apiUrl}all?fields=${fields}`);
  }

  getPaisesParaDashboard(): Observable<Pais[]> {
    const fields = [
      'name',
      'region',
      'population',
      'cca3',
    ].join(',');
    return this.http.get<Pais[]>(`${this.apiUrl}all?fields=${fields}`);
  }

  getPaisByCode(code: string): Observable<Pais> {
    const fields = [
      'name',
      'flags',
      'capital',
      'subregion',
      'region',
      'currencies',
      'languages',
      'borders',
      'cca3',
      'maps'
    ].join(',');

    const url = `${this.apiUrl}alpha/${code}?fields=${fields}`;
    
    return this.http.get<Pais | Pais[]>(url).pipe(
      map((p) => (Array.isArray(p) ? p[0] : p) as Pais)
    );
  }
}
