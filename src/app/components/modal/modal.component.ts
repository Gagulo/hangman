import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() success: boolean;
  @Input() playedTime: number;
  @Input() gameWon?: boolean;
  @Input() resetGame?: () => void;
  @Input() nextLevel?: () => void;
}
