export type Cell = 'X' | 'O' | null;
export type Board = Cell[];
export type Winner = 'X' | 'O' | 'DRAW' | null;

export const emptyBoard = (): Board => Array(9).fill(null);

// PUBLIC_INTERFACE
export function checkWinner(board: Board): Winner {
  /** Returns 'X' | 'O' | 'DRAW' | null depending on board state */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((c) => c)) return 'DRAW';
  return null;
}

function availableMoves(board: Board): number[] {
  const moves: number[] = [];
  board.forEach((v, idx) => {
    if (!v) moves.push(idx);
  });
  return moves;
}

function makeMove(board: Board, idx: number, player: 'X' | 'O'): Board {
  const copy = board.slice();
  copy[idx] = player;
  return copy;
}

function scoreWinner(w: Winner, depth: number, ai: 'X' | 'O') {
  if (w === ai) return 10 - depth;
  if (w && w !== 'DRAW') return depth - 10;
  return 0;
}

type MinimaxResult = { score: number; move: number | null };

function minimax(board: Board, player: 'X' | 'O', ai: 'X' | 'O', depth = 0, alpha = -Infinity, beta = Infinity): MinimaxResult {
  const res = checkWinner(board);
  if (res) {
    return { score: scoreWinner(res, depth, ai), move: null };
  }
  const moves = availableMoves(board);
  if (player === ai) {
    // maximize
    let best: MinimaxResult = { score: -Infinity, move: null };
    for (const m of moves) {
      const evalRes = minimax(makeMove(board, m, player), player === 'X' ? 'O' : 'X', ai, depth + 1, alpha, beta);
      if (evalRes.score > best.score) best = { score: evalRes.score, move: m };
      alpha = Math.max(alpha, evalRes.score);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    // minimize
    let best: MinimaxResult = { score: Infinity, move: null };
    for (const m of moves) {
      const evalRes = minimax(makeMove(board, m, player), player === 'X' ? 'O' : 'X', ai, depth + 1, alpha, beta);
      if (evalRes.score < best.score) best = { score: evalRes.score, move: m };
      beta = Math.min(beta, evalRes.score);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// PUBLIC_INTERFACE
export function getBestMove(board: Board, ai: 'X' | 'O', firstPlayer: 'X' | 'O'): number {
  /** Returns optimal move index for the AI using minimax with alpha-beta pruning */
  return minimax(board, firstPlayer, ai).move ?? availableMoves(board)[0];
}
