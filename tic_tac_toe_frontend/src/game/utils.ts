import { Board, GameStatus, Player } from './types';

const winLines: number[][] = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diags
];

// PUBLIC_INTERFACE
export function createEmptyBoard(): Board {
  /** Creates a new empty board of 9 cells. */
  return Array.from<CellValue>({ length: 9 }).map(() => null);
}
type CellValue = Player | null;

// PUBLIC_INTERFACE
export function getWinner(board: Board): Player | null {
  /** Returns winner symbol if any. */
  for (const [a,b,c] of winLines) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return v;
  }
  return null;
}

// PUBLIC_INTERFACE
export function isBoardFull(board: Board): boolean {
  /** Returns true if there are no empty cells. */
  return board.every((c) => c !== null);
}

// PUBLIC_INTERFACE
export function getGameStatus(board: Board): GameStatus {
  /** Computes current game status from board state. */
  const w = getWinner(board);
  if (w === 'X') return 'X_WON';
  if (w === 'O') return 'O_WON';
  if (isBoardFull(board)) return 'DRAW';
  return 'IN_PROGRESS';
}

// PUBLIC_INTERFACE
export function availableMoves(board: Board): number[] {
  /** Returns indices of empty cells. */
  const res: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) res.push(i);
  }
  return res;
}
