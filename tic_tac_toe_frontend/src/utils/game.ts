export type CellValue = 'X' | 'O' | null;
export type Board = CellValue[];

export const WIN_LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export function cloneBoard(b: Board): Board {
  // shallow copy is enough as cells are primitives
  return b.slice() as Board;
}

export function emptyBoard(): Board {
  // Always produce a fresh 9-null board
  return new Array<CellValue>(9).fill(null);
}

export function getWinner(board: Board): { winner: 'X' | 'O' | null; line: number[] | null } {
  // Small, hot loop; avoid extra function calls
  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    const va = board[a];
    if (va && va === board[b] && va === board[c]) {
      return { winner: va, line: WIN_LINES[i] };
    }
  }
  return { winner: null, line: null };
}

export function isDraw(board: Board): boolean {
  // If any empty cell exists, not a draw
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) return false;
  }
  // All filled and no winner => draw
  return getWinner(board).winner === null;
}

export function getAvailableMoves(board: Board): number[] {
  const out: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) out.push(i);
  }
  return out;
}

export function makeMove(board: Board, idx: number, player: 'X' | 'O'): Board {
  if (idx < 0 || idx >= board.length) return board;
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
  return avail[r]!;
}

// Try to win or block if possible
function tacticalMove(board: Board, player: 'X' | 'O'): number | null {
  const avail = getAvailableMoves(board);
  // try to win
  for (let k = 0; k < avail.length; k++) {
    const i = avail[k]!;
    const b = makeMove(board, i, player);
    if (getWinner(b).winner === player) return i;
  }
  // try to block
  const opp: 'X' | 'O' = player === 'X' ? 'O' : 'X';
  for (let k = 0; k < avail.length; k++) {
    const i = avail[k]!;
    const b = makeMove(board, i, opp);
    if (getWinner(b).winner === opp) return i;
  }
  return null;
}

// Minimax for hard AI — optimal for 3x3; pruning not necessary but code remains tight
function minimax(board: Board, _player: 'X' | 'O', maximizing: boolean, ai: 'X' | 'O'): { score: number; move: number | null } {
  const result = getWinner(board);
  if (result.winner) {
    if (result.winner === ai) return { score: 10, move: null };
    return { score: -10, move: null };
  }
  if (isDraw(board)) return { score: 0, move: null };

  const current = maximizing ? ai : (ai === 'X' ? 'O' : 'X');
  const avail = getAvailableMoves(board);

  let best: { score: number; move: number | null };
  if (maximizing) {
    best = { score: -Infinity, move: null };
    for (let k = 0; k < avail.length; k++) {
      const i = avail[k]!;
      const next = makeMove(board, i, current);
      const val = minimax(next, _player, false, ai);
      if (val.score > best.score) best = { score: val.score, move: i };
      if (best.score === 10) break; // early exit - cannot beat a guaranteed win
    }
  } else {
    best = { score: Infinity, move: null };
    for (let k = 0; k < avail.length; k++) {
      const i = avail[k]!;
      const next = makeMove(board, i, current);
      const val = minimax(next, _player, true, ai);
      if (val.score < best.score) best = { score: val.score, move: i };
      if (best.score === -10) break; // early exit - cannot avoid a forced loss
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
