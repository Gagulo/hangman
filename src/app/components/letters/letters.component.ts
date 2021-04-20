import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent {
  @Input() onLetterClicked: (letter: string) => void;
  @Input() onSelectedLetters: object;

  lettersArray = ['ABCDEFGHIJK', 'LMNOPQRS', 'TUVWXYZ']
    .map(letters => letters.split(''));
}
