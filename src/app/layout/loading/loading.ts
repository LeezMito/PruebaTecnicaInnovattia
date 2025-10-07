import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading-service/loading-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.sass'
})
export class Loading {
  loader = inject(LoadingService);
}
