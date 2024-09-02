import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  board!: Array<string>;
  player_turn = 'X';
  winning_border = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]  // Added the missing diagonal combination
  ];

  constructor() {}

  ngOnInit(): void {
    this.board = new Array(9).fill('');
  }

  handlePlayer(index: number) {
    if (this.board[index] === '') {
      this.board[index] = this.player_turn;
      
      // Check for a winner before changing the turn
      if (this.checkWinner()) {
        alert('Player ' + this.player_turn + ' has won the game!');
        return;
      }

      // Change the turn
      this.player_turn = this.player_turn === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(): boolean {
    for (let i = 0; i < this.winning_border.length; i++) {
      const [p1, p2, p3] = this.winning_border[i];
      if (
        this.board[p1] !== '' &&
        this.board[p1] === this.board[p2] &&
        this.board[p2] === this.board[p3]
      ) {
        return true;
      }
    }
    return false;
  }
}
