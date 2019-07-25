import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isNightMode = false;
  private nightModeSubject = new Subject<boolean>();

  constructor() { }

  getNightModeSubject(): Subject<boolean> {
    return this.nightModeSubject;
  }

  toggleNightMode(): void {
    this.isNightMode = !this.isNightMode;
    this.nightModeSubject.next(this.isNightMode);
  }
}
