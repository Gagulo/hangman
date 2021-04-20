import { Component, OnDestroy } from '@angular/core';
import { GameService } from './services/game.service';
import { Subscription } from 'rxjs';

export enum defaultValue {
  ZERO = 0,
  SIX = 6
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public selectedLetters = {};
  public selectedWord = '';
  public wrongCount = defaultValue.ZERO;
  private matchCount = defaultValue.ZERO;
  public gameTime = defaultValue.ZERO;
  private maximumWrong = defaultValue.SIX;
  public success = null;
  public gameWon = false;
  private words$: string[] = [];
  private subscription: Subscription;

  constructor(private gameService: GameService) {
    this.getWords();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getWords = (): void => {
  this.subscription = this.gameService.getData()
                          .subscribe((data: Array<string>) => {
                            this.words$ = data.sort(() => .5 - Math.random())
                                              .slice(0, 5);
                            this.resetGame();
                          });
}

  private resetGame(): void {
    this.selectedLetters = {};
    this.wrongCount = this.matchCount = this.gameTime = defaultValue.ZERO;
    this.maximumWrong = defaultValue.SIX;
    this.selectWord();
    this.setGameOverStatus(null);
    // TODO: You can see selected 5 words:
    console.log(this.words$);
  }

  public nextLevel = (): void => {
    this.selectWord(this.selectedWord);
  }

  private setGameOverStatus(status: boolean): void {
    this.success = status;
  }

  private selectWord(currentWord?: string): void {
    if (currentWord) {
      let wordIndex = this.words$.indexOf(currentWord.toLowerCase());
      this.selectedWord = this.words$[++wordIndex].toUpperCase();
      if (wordIndex === this.words$.length - 1) {
        this.gameWon = true;
      }
      this.selectedLetters = {};
      this.wrongCount = this.matchCount = defaultValue.ZERO;
      this.maximumWrong = defaultValue.SIX;
      this.setGameOverStatus(null);
    } else {
      this.selectedWord = this.words$[defaultValue.ZERO].toUpperCase();
    }
  }

  public onSelectLetter = (letter: string): void => {
    if (this.selectedLetters[letter] === undefined) {
      const matchedLettersCount = (this.selectedWord.match(new RegExp(letter, 'g')) || []).length;
      const containLetter = matchedLettersCount > defaultValue.ZERO;
      this.selectedLetters[letter] = containLetter;
      if (containLetter) {
        this.matchCount += matchedLettersCount;
        if (this.matchCount >= this.selectedWord.length) {
          this.setGameOverStatus(true);
        }
      } else {
        this.wrongCount++;
        if (this.wrongCount >= this.maximumWrong) {
          this.setGameOverStatus(false);
        }
      }
    }
  }
}
