import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
const NEW_LINE_CHARACTER = '\n';

@Component({
  selector: 'app-freshitor',
  templateUrl: './freshitor.component.html',
  styleUrls: ['./freshitor.component.scss']
})
export class FreshitorComponent implements OnInit {
  @ViewChild('textSource', {static: true}) textElement: ElementRef;
  @ViewChild('textDisplay', {static: true}) textDisplay: ElementRef;
  source: string;

  constructor() { }

  ngOnInit() {
    this.textElement.nativeElement.focus();
  }

  @HostListener('window:click', ['$event.target'])
  onClick(target) {
    this.textElement.nativeElement.focus();
  }

  onTextChange() {
    const textArea = this.textElement.nativeElement;
    const textDisplay = this.textDisplay.nativeElement;
    this.autosize(textArea, textDisplay);

    const source = textArea.value;

    const textLines = source.split(NEW_LINE_CHARACTER);
    const maxLengthIndex = this.getMaxLengthIndex(textLines);
    const maxLengthText = this.getTextAt(textLines, maxLengthIndex);
    this.source = maxLengthText;
  }

  autosize(textArea, textDisplay) {

    if (textArea.scrollHeight >= window.innerHeight - 30) {
      return;
    }

    let width = 0;

    if (textDisplay) {
      width = textDisplay.offsetWidth + 100;
    }

    // reset min-width
    if (width < 300) {
      width = 300;
    }

    // reset max-width
    if (width >= window.innerWidth - 30) {
      width = window.innerWidth - 30;
    }

    // console.log('autosize()', textArea);
    setTimeout(() => {
      textArea.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      const cssText = 'height:' + textArea.scrollHeight + 'px; width:' + width + 'px;';
      textArea.style.cssText = cssText;
    }, 0);
  }

  getLineNumber(textArea) {
    const source = textArea.value;
    const lineNumber = source.substr(0, textArea.selectionStart).split(NEW_LINE_CHARACTER).length;
    return lineNumber;
  }

  getMaxLengthIndex(textLines: string[]) {
  // getMaxLengthLineNumber(text: string) {
    // const textLines = text.split(NEW_LINE_CHARACTER);
    let maxLength = -1;
    let maxLengthIndex = -1;

    if (textLines.length > 0) {
      maxLength = textLines[0].length;
      maxLengthIndex = 0;
      for (let lineIndex = 1; lineIndex < textLines.length ; lineIndex++) {
        const currentLineLength = textLines[lineIndex].length;
        if (currentLineLength > maxLength) {
          maxLength = currentLineLength;
          maxLengthIndex = lineIndex;
        }
      }
    }

    return maxLengthIndex;
  }

  getTextAt(textLines: string[], index: number) {
    return textLines[index];
  }

}
