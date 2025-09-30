export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export type GameStatus = 'IN_PROGRESS' | 'X_WON' | 'O_WON' | 'DRAW';

export type Move = {
  index: number;
  player: Player;
};
