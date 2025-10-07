import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private pending = 0;
  readonly visible = signal(false);

  start(): void {
    this.pending++;
    if (!this.visible()) this.visible.set(true);
  }

  stop(): void {
    this.pending = Math.max(0, this.pending - 1);
    if (this.pending === 0) this.visible.set(false);
  }
}