import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { NavMobile } from "./layout/nav-mobile/nav-mobile";
import { Loading } from "./layout/loading/loading";
import { LoadingService } from './core/services/loading-service/loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NavMobile, Loading],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  loader = inject(LoadingService);
}
