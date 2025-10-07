export interface Pais {
  name: NombrePais;
  flags: BanderaPais;
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  languages: Record<string, string>;
  currencies?: Record<string, MonedaPais>;
  borders?: string[];
  maps?: MapasPais;
  cca3: string;
}

export interface BanderaPais {
    png?: string;
    svg?: string;
    alt?: string;
}

export interface NombrePais {
    common: string;
    official: string;
}

export interface MonedaPais {
    name: string
    cambio: number;
    symbol?: string
}

export interface MapasPais {
  googleMaps?: string
  openStreetMaps?: string
}


