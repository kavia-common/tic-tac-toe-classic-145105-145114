import { Board, Player } from './types';
import { availableMoves, getWinner } from './utils';

// PUBLIC_INTERFACE
export function aiEasy(board: Board): number | null {
  /** Easy AI: choose a random available move. */
  const moves = availableMoves(board);
  if (moves.length === 0) return null;
  const i = Math.floor(Math.random() * moves.length);
  return moves[i];
}

// PUBLIC_INTERFACE
export function aiNormal(board: Board, ai: Player, opponent: Player): number | null {
  /**
   * Normal AI:
   * 1) Win if possible
   * 2) Block opponent win
   * 3) Take center if free
   * 4) Take a corner
   * 5) Fallback random
   */
  const moves = availableMoves(board);
  if (!moves.length) return null;

  // Try winning move
  for (const idx of moves) {
    const next = board.slice();
    next[idx] = ai;
    if (getWinner(next) === ai) return idx;
  }

  // Block opponent
  for (const idx of moves) {
    const next = board.slice();
    next[idx] = opponent;
    if (getWinner(next) === opponent) return idx;
  }

  // Center
  if (moves.includes(4)) return 4;

  // Corners
  const corners = [0,2,6,8];
  const corner = corners.find((c) => moves.includes(c));
  if (corner !== undefined) return corner;

  // Random
  return aiEasy(board);
}
