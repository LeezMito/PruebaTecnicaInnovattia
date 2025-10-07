# WorldExplorer

Este proyecto fue realizado con [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.

## Development server

Para iniciar tu proyecto:

```bash
npm install
ng serve
```



## Documentación Técnica - Prueba técnica
Este documento resume los aspectos técnicos principales del proyecto World Explorer, una aplicación web desarrollada con Angular 20. El propósito de esta documentación es servir como guía técnica para comprender la estructura general, tecnologías empleadas y posibles áreas de mejora.
1. Descripción General
World Explorer es una aplicación donde permite explorar información de países a través de la REST Countries API y la FXRatesAPI. La aplicación muestra datos como nombre, bandera, población, región, idioma y moneda, además de ofrecer conversión de divisas en tiempo real.
También se ofrece un dashboard para ver KPIs de indicadores.
2. Tecnologías Utilizadas
- **Framework Frontend:** Angular 20
- **Estilos y Diseño:** TailwindCSS
- **APIs Externas:** REST Countries API, FXRatesAPI
- **Lenguaje:** TypeScript
- **Control de versiones:** Git
- **Gestión de dependencias:** NPM
3. Estructura del Proyecto
El proyecto sigue una estructura modular basada en Angular, con componentes reutilizables y servicios encargados de la comunicación con las APIs externas. Ejemplo simplificado de la estructura:

src/
 ├── app/
 │   ├── components/
 │   ├── services/
 │   ├── pages/
 │   └── models/
 ├── assets/
 ├── environments/
 └── main.ts
4. Funcionalidades Principales
- Listado de países con información general.
- Filtro por región, idioma y búsqueda por nombre.
- Detalle de país con bandera, capital, moneda e idiomas.
- Conversión de moneda en tiempo real con FXRatesAPI.
- Visualización adaptable (responsive) para dispositivos móviles.
5. Mejores Prácticas Aplicadas
- Uso de componentes desacoplados y reutilizables.
- Manejo de errores en suscripciones HTTP.
- Tipado estricto en TypeScript para mejorar la mantenibilidad.
- Diseño mobile-first con Tailwind.
- Integración modular de servicios y observables.
6. Puntos de Mejora
- Implementar **ordenamiento por población** y otros criterios dinámicos.
- Realizar **testeo de componentes y servicios** (unitarios e integración).
- **Optimizar la paleta de colores** para alinearla con una identidad visual de marca.
- Añadir **animaciones suaves** y microinteracciones para mejorar la UX.
7. Próximos Pasos
- Ampliar cobertura de pruebas unitarias.
- Mejorar performance mediante lazy loading.



