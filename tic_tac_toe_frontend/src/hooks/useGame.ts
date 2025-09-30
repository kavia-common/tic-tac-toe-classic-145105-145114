import { useCallback, useEffect, useMemo, useState } from 'react';
import { Board, emptyBoard, getAIMove, getWinner, isDraw, makeMove } from '../utils/game';
import { useSettings } from './useSettings';
import { useScore } from './useScore';

type EndState = { status: 'win' | 'draw' | 'ongoing'; winner: 'X' | 'O' | null; line: number[] | null };

function initialPlayer(playerStarts: boolean): 'X' | 'O' {
  return playerStarts ? 'X' : 'O';
}

// PUBLIC_INTERFACE
export function useGame() {
  /** Core game state management with AI moves and persistence to score. */
  const { settings } = useSettings();
  const { addWin, addDraw } = useScore();

  const [board, setBoard] = useState<Board>(emptyBoard());
  const [turn, setTurn] = useState<'X' | 'O'>(initialPlayer(settings.playerStarts));
  const [end, setEnd] = useState<EndState>({ status: 'ongoing', winner: null, line: null });

  // Restart the game
  const reset = useCallback((playerStarts?: boolean) => {
    const start = typeof playerStarts === 'boolean' ? initialPlayer(playerStarts) : initialPlayer(settings.playerStarts);
    setBoard(emptyBoard());
    setTurn(start);
    setEnd({ status: 'ongoing', winner: null, line: null });
  }, [settings.playerStarts]);

  // Make a player move
  const move = useCallback((idx: number) => {
    if (end.status !== 'ongoing' || board[idx]) return;
    const next = makeMove(board, idx, turn);
    const w = getWinner(next);
    if (w.winner) {
      setBoard(next);
      setEnd({ status: 'win', winner: w.winner, line: w.line });
      addWin(w.winner);
      return;
    }
    if (isDraw(next)) {
      setBoard(next);
      setEnd({ status: 'draw', winner: null, line: null });
      addDraw();
      return;
    }
    setBoard(next);
    setTurn(turn === 'X' ? 'O' : 'X');
  }, [board, turn, end.status, addDraw, addWin]);

  // AI auto move
  const aiShouldMove = useMemo(() => settings.vsAI && ((settings.playerStarts && turn === 'O') || (!settings.playerStarts && turn === 'X')), [settings.vsAI, settings.playerStarts, turn]);

  useEffect(() => {
    if (end.status !== 'ongoing') return;
    if (!settings.vsAI) return;
    if (!aiShouldMove) return;

    const tm = setTimeout(() => {
      const aiMove = getAIMove(board, turn, settings.aiLevel);
      if (aiMove !== null) {
        move(aiMove);
      }
    }, 400);
    return () => clearTimeout(tm);
  }, [aiShouldMove, board, end.status, move, settings.aiLevel, settings.vsAI, turn]);

  return { board, turn, end, move, reset };
}
