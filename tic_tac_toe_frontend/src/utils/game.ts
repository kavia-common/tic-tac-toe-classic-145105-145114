export type CellValue = 'X' | 'O' | null;
export type Board = CellValue[];

export const WIN_LINES: number[][] = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diagonals
];

export function cloneBoard(b: Board): Board {
  return [...b];
}

export function emptyBoard(): Board {
  return Array(9).fill(null);
}

export function getWinner(board: Board): { winner: 'X' | 'O' | null; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a]!, line };
    }
  }
  return { winner: null, line: null };
}

export function isDraw(board: Board): boolean {
  return board.every(Boolean) && getWinner(board).winner === null;
}

export function getAvailableMoves(board: Board): number[] {
  return board.map((v,i) => (v ? -1 : i)).filter(i => i !== -1);
}

export function makeMove(board: Board, idx: number, player: 'X' | 'O'): Board {
  if (board[idx]) return board;
  const next = cloneBoard(board);
  next[idx] = player;
  return next;
}

// AI strategies
function randomMove(board: Board): number | null {
  const avail = getAvailableMoves(board);
  if (avail.length === 0) return null;
  const r = Math.floor(Math.random() * avail.length);
  return avail[r];
}

// Try to win or block if possible
function tacticalMove(board: Board, player: 'X' | 'O'): number | null {
  // win
  for (const i of getAvailableMoves(board)) {
    const b = makeMove(board, i, player);
    if (getWinner(b).winner === player) return i;
  }
  // block
  const opp: 'X' | 'O' = player === 'X' ? 'O' : 'X';
  for (const i of getAvailableMoves(board)) {
    const b = makeMove(board, i, opp);
    if (getWinner(b).winner === opp) return i;
  }
  return null;
}

// Minimax for hard AI
function minimax(board: Board, player: 'X' | 'O', maximizing: boolean, ai: 'X' | 'O'): { score: number; move: number | null } {
  const result = getWinner(board);
  if (result.winner) {
    if (result.winner === ai) return { score: 10, move: null };
    return { score: -10, move: null };
  }
  if (isDraw(board)) return { score: 0, move: null };

  const current = maximizing ? ai : (ai === 'X' ? 'O' : 'X');
  let best: { score: number; move: number | null } = { score: maximizing ? -Infinity : Infinity, move: null };

  for (const i of getAvailableMoves(board)) {
    const next = makeMove(board, i, current);
    const val = minimax(next, player, !maximizing, ai);
    if (maximizing) {
      if (val.score > best.score) best = { score: val.score, move: i };
    } else {
      if (val.score < best.score) best = { score: val.score, move: i };
    }
  }
  return best;
}

// PUBLIC_INTERFACE
export function getAIMove(board: Board, player: 'X' | 'O', level: 'easy' | 'medium' | 'hard'): number | null {
  /** Returns an AI move index for the given difficulty level. */
  if (level === 'easy') {
    return randomMove(board);
  }
  if (level === 'medium') {
    const t = tacticalMove(board, player);
    return t !== null ? t : randomMove(board);
  }
  // hard
  const res = minimax(board, player, true, player);
  return res.move;
}
