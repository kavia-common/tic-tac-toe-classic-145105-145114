import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadJSON, saveJSON, storageKeys, Stats } from '../storage/asyncStorage';

// PUBLIC_INTERFACE
export type StatsContextValue = {
  stats: Stats;
  recordWin: (winner: 'X' | 'O') => void;
  recordDraw: () => void;
  resetStats: () => void;
};

const defaultStats: Stats = {
  totalGames: 0,
  xWins: 0,
  oWins: 0,
  draws: 0,
  lastWinner: null,
};

const StatsContext = createContext<StatsContextValue>({
  stats: defaultStats,
  recordWin: () => {},
  recordDraw: () => {},
  resetStats: () => {},
});

/**
 * PUBLIC_INTERFACE
 * StatsProvider
 * Tracks aggregate statistics across sessions with persistence.
 */
export const StatsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(defaultStats);

  useEffect(() => {
    loadJSON<Stats>(storageKeys.stats, defaultStats).then(setStats);
  }, []);

  const persist = useCallback((next: Stats) => {
    setStats(next);
    saveJSON(storageKeys.stats, next);
  }, []);

  const recordWin = useCallback((winner: 'X' | 'O') => {
    persist({
      totalGames: stats.totalGames + 1,
      xWins: stats.xWins + (winner === 'X' ? 1 : 0),
      oWins: stats.oWins + (winner === 'O' ? 1 : 0),
      draws: stats.draws,
      lastWinner: winner,
    });
  }, [persist, stats]);

  const recordDraw = useCallback(() => {
    persist({
      totalGames: stats.totalGames + 1,
      xWins: stats.xWins,
      oWins: stats.oWins,
      draws: stats.draws + 1,
      lastWinner: 'DRAW',
    });
  }, [persist, stats]);

  const resetStats = useCallback(() => {
    persist(defaultStats);
  }, [persist]);

  const value = useMemo(
    () => ({ stats, recordWin, recordDraw, resetStats }),
    [stats, recordWin, recordDraw, resetStats]
  );

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

// PUBLIC_INTERFACE
export function useStats(): StatsContextValue {
  /** Access stats context. */
  return useContext(StatsContext);
}
