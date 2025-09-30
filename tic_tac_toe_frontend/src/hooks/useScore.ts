import { useEffect, useState, useCallback } from 'react';
import { defaultScore, loadScore, saveScore, ScoreState } from '../utils/storage';

// PUBLIC_INTERFACE
export function useScore() {
  /** Manage X/O/draw score with persistence. */
  const [score, setScore] = useState<ScoreState>(defaultScore);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await loadScore();
        if (stored) setScore(stored);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const addWin = useCallback((winner: 'X' | 'O') => {
    setScore(prev => {
      const next: ScoreState = winner === 'X' ? { ...prev, x: prev.x + 1 } : { ...prev, o: prev.o + 1 };
      saveScore(next).catch(() => {});
      return next;
    });
  }, []);

  const addDraw = useCallback(() => {
    setScore(prev => {
      const next = { ...prev, draws: prev.draws + 1 };
      saveScore(next).catch(() => {});
      return next;
    });
  }, []);

  const resetScore = useCallback(() => {
    setScore(defaultScore);
    saveScore(defaultScore).catch(() => {});
  }, []);

  return { score, addWin, addDraw, resetScore, ready };
}
