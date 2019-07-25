import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  onTextChange() {
    const textArea = this.textElement.nativeElement;
    this.autosize(textArea);

    const source = textArea.value;
    console.log('lineNumber', this.getLineNumber(textArea));

    const textLines = source.split(NEW_LINE_CHARACTER);
    const maxLengthIndex = this.getMaxLengthIndex(textLines);
    console.log('maxLengthIndex', maxLengthIndex);
    const maxLengthText = this.getTextAt(textLines, maxLengthIndex);
    this.source = maxLengthText;
  }

  autosize(textArea) {

    // this.source = textArea.value;

    if (textArea.scrollHeight >= window.innerHeight - 30) {
      return;
    }

    console.log('autosize()', textArea);
    setTimeout(() => {
      textArea.style.cssText = 'height:auto; padding:0';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';
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
