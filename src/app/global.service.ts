import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isNightMode = false;
  private nightModeSubject = new Subject<boolean>();

  private isFullscreen = false;
  private fullscreenSubject = new Subject<boolean>();

  constructor() { }

  getNightModeSubject(): Subject<boolean> {
    return this.nightModeSubject;
  }

  toggleNightMode(): void {
    this.isNightMode = !this.isNightMode;
    this.nightModeSubject.next(this.isNightMode);
  }

  getFullscreenSubject(): Subject<boolean> {
    return this.fullscreenSubject;
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    this.fullscreenSubject.next(this.isFullscreen);
  }
}
