import {
  Board,
  emptyBoard,
  getWinner,
  isDraw,
  makeMove,
  getAIMove,
  getAvailableMoves,
  WIN_LINES,
} from '../game';

describe('game utils', () => {
  test('emptyBoard has 9 nulls', () => {
    const b = emptyBoard();
    expect(b).toHaveLength(9);
    expect(b.every((c) => c === null)).toBe(true);
  });

  test('getAvailableMoves returns indices of empty cells', () => {
    const b: Board = [null, 'X', null, 'O', null, null, 'X', null, 'O'];
    expect(getAvailableMoves(b)).toEqual([0, 2, 4, 5, 7]);
  });

  test('makeMove validates bounds and occupancy', () => {
    const b = emptyBoard();
    const moved = makeMove(b, 0, 'X');
    expect(moved[0]).toBe('X');
    // original board is not mutated
    expect(b[0]).toBeNull();

    // cannot overwrite
    const again = makeMove(moved, 0, 'O');
    expect(again[0]).toBe('X');

    // out of range returns same board
    const outNeg = makeMove(moved, -1, 'O');
    expect(outNeg).toBe(moved);
    const outPos = makeMove(moved, 99, 'O');
    expect(outPos).toBe(moved);
  });

  test('getWinner detects all win lines', () => {
    for (const line of WIN_LINES) {
      const b = emptyBoard();
      for (const idx of line) b[idx] = 'X';
      const res = getWinner(b);
      expect(res.winner).toBe('X');
      expect(res.line).toEqual(line);
    }
  });

  test('isDraw identifies filled board with no winner', () => {
    // Known draw board pattern
    const b: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(getWinner(b).winner).toBeNull();
    expect(isDraw(b)).toBe(true);
  });

  describe('AI', () => {
    const originalRandom = Math.random;
    afterEach(() => {
      Math.random = originalRandom;
    });

    test('easy AI picks using Math.random from available', () => {
      const b: Board = ['X', 'O', 'X', null, null, null, 'O', 'X', null];
      // available: [3,4,5,8]
      Math.random = () => 0.49; // floor(0.49*4)=1 -> index 4 (value=4)
      const move = getAIMove(b, 'O', 'easy');
      expect([3, 4, 5, 8]).toContain(move);
    });

    test('medium AI tries to win', () => {
      // O to play, can win at index 5
      const b: Board = ['O', 'O', null, 'X', 'X', null, null, null, null];
      const move = getAIMove(b, 'O', 'medium');
      expect(move).toBe(2); // O can win at 2 (0,1,2 line)
    });

    test('medium AI blocks opponent', () => {
      // X threatens to win at index 2, O should block
      const b: Board = ['X', 'X', null, 'O', null, null, null, null, null];
      const move = getAIMove(b, 'O', 'medium');
      expect(move).toBe(2);
    });

    test('hard AI is optimal: takes center or fork strategy', () => {
      // Empty board, AI is X. Optimal first move often center(4)
      const b = emptyBoard();
      const move = getAIMove(b, 'X', 'hard');
      expect(move).toBe(4);
    });

    test('hard AI avoids immediate loss and takes winning move', () => {
      // X is AI, can win at 2
      const b: Board = ['X', 'X', null, 'O', 'O', null, null, null, null];
      const move = getAIMove(b, 'X', 'hard');
      expect(move).toBe(2);
    });
  });
});
