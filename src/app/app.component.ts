import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { GlobalService } from './global.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Freshitor';
  key: string;
  elem;

  constructor(
    private global: GlobalService,
    @Inject(DOCUMENT) private document: any,
  ) { }

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

    this.elem = document.documentElement;
    this.global.getFullscreenSubject().subscribe( isFullscreen => {
      if (isFullscreen) {
        this.openFullscreen();
      } else {
        this.closeFullscreen();
      }
    });
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

    const isFullscreenCommand = this.getMultiKeys(event, 'Control', 'x');
    if (isFullscreenCommand) {
      this.global.toggleFullscreen();
    }
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

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
