export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Settings: undefined;
  GameOverModal: {
    result: 'X_WON' | 'O_WON' | 'DRAW';
    onPlayAgain?: () => void;
    onHome?: () => void;
  };
};
