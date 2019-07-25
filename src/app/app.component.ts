import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Freshitor';
  key: string;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.global.getNightModeSubject().subscribe(isNightMode => {
      const toggleElements = this.getAllToggleElements();
      if (isNightMode) {
        for (let i = 0; i<toggleElements.length; i++) {
          if (toggleElements[i]) {
            toggleElements[i].classList.add('night-mode');
          }
        }
      } else {
        for (let i = 0 ; i <toggleElements.length; i++) {
          if (toggleElements[i]) {
            toggleElements[i].classList.remove('night-mode');
          }
        }
      }
    }) ;
  }

  getAllToggleElements() {
    return document.getElementsByClassName('toggle');
  }

  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    const ctrl = event.getModifierState('Control');

    const isNightModeCommand = this.getMultiKeys(event, 'Control', 's');
    if (isNightModeCommand) {
      this.toggleNightMode();
    }
    console.log('handleKeyboardEvent', isNightModeCommand, event.key);
  }

  getMultiKeys(event: KeyboardEvent, modifier: string, keyCode: string) {
    /*
    Legal Values:
      "Alt"
      "AltGraph"
      "CapsLock"
      "Control"
      "Meta"
      "NumLocK"
      "ScrollLock"
      "Shift"
    */
    return event.getModifierState
      && event.getModifierState(modifier)
      && (event.key === keyCode.toUpperCase() || event.key === keyCode.toLowerCase());
  }

  toggleNightMode() {
    this.global.toggleNightMode();
  }
}
