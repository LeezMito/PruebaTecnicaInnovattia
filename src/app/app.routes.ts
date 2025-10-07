import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'paises',
        loadComponent: () =>
        import('./features/consulta-paises/consulta-paises').then((m) => m.ConsultaPaises),
    },
    {
        path: 'paises/pais-detalle/:code',
        loadComponent: () => import('./features/pais-detalle/pais-detalle').then((m) => m.PaisDetalle),
    },
    {
        path: '**', redirectTo: 'inicio', pathMatch: 'full',
    },
];
