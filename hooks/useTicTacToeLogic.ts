import { ChangeEvent, useCallback, useEffect, useState } from "react";

import {
  makeMove,
  checkWin,
  getWinningIndexes,
} from "@/components/TicTacToeGame/moves";
import { playSound } from "@/components/TicTacToeGame/utils";

const defaultBoardState = Array.from({ length: 9 }, () => null);

type GameSettings = {
  name: string;
  symbol: string;
  sound: "sound-on" | "sound-off";
  difficulty: "easy" | "hard";
};

type GameScores = {
  playerScore: number;
  assistantScore: number;
  tieScore: number;
};

const defaultGameSettings: GameSettings = {
  name: "",
  symbol: "",
  sound: "sound-on",
  difficulty: "hard",
};

const defaultGameScores: GameScores = {
  playerScore: 0,
  assistantScore: 0,
  tieScore: 0,
};

export function useTicTacToeLogic() {
  const [gameSettings, setGameSettings] = useState<GameSettings>(() => {
    const ticTacToeSettings = localStorage.getItem("tic-tac-toe-settings");
    if (!ticTacToeSettings) return defaultGameSettings;
    return JSON.parse(ticTacToeSettings);
  });
  const [openSettings, setOpenSettings] = useState<boolean>(() => {
    const _settings = localStorage.getItem("tic-tac-toe-settings");
    if (
      !_settings ||
      !JSON.parse(_settings).name ||
      !JSON.parse(_settings).symbol
    )
      return true;

    return false;
  });
  const [board, setBoard] = useState<(string | null)[]>(defaultBoardState);
  const [isAssistantTurn, setIsAssistantTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState<GameScores>(() => {
    const _scores = localStorage.getItem("tic-tac-toe-scores");
    if (!_scores) return defaultGameScores;
    return JSON.parse(_scores) as GameScores;
  });
  const [playerIsFirstToPlay, setPlayerIsFirstToPlay] = useState(true);
  const playerSymbol = gameSettings.symbol || "x";
  const assistantSymbol = playerSymbol === "x" ? "o" : "x";
  const isWin =
    checkWin(board, playerSymbol) || checkWin(board, assistantSymbol);
  const isGameTie = board.every((s) => typeof s === "string") && !isWin;
  const isEmpty = board.every((s) => typeof s !== "string");
  const difficulty = gameSettings.difficulty;
  const sound = gameSettings.sound === "sound-on";

  const checkAndPlaySound = useCallback(
    (path: string) => sound && playSound(path),
    [sound]
  );

  useEffect(() => {
    if (!isAssistantTurn) return;
    if (isWin) return;
    if (isEmpty && playerIsFirstToPlay) return;

    setTimeout(() => {
      const assistantMove = makeMove(
        board,
        difficulty,
        playerSymbol,
        assistantSymbol
      );
      if (assistantMove !== false) {
        const copy = [...board];
        copy[assistantMove] = assistantSymbol;
        setBoard(copy);
        checkAndPlaySound(
          require("../public/sounds/the-notification-email-143029.mp3")
        );
      }
      setIsAssistantTurn(false);
    }, 200);
  }, [
    board,
    isAssistantTurn,
    isWin,
    isEmpty,
    playerIsFirstToPlay,
    difficulty,
    sound,
    checkAndPlaySound,
    playerSymbol,
    assistantSymbol,
  ]);

  useEffect(() => {
    if (gameOver) return;
    const hasPlayerWon = checkWin(board, playerSymbol);
    const hasAssistantWon = checkWin(board, assistantSymbol);

    if (hasPlayerWon) {
      const _scores = { ...scores, playerScore: scores.playerScore + 1 };
      setScores(_scores);
      localStorage.setItem("tic-tac-toe-scores", JSON.stringify(_scores));
    }
    if (hasAssistantWon) {
      const _scores = { ...scores, assistantScore: scores.assistantScore + 1 };
      setScores(_scores);
      localStorage.setItem("tic-tac-toe-scores", JSON.stringify(_scores));
    }
    if (isGameTie) {
      const _scores = { ...scores, tieScore: scores.tieScore + 1 };
      setScores(_scores);
      localStorage.setItem("tic-tac-toe-scores", JSON.stringify(_scores));
      checkAndPlaySound(require("../public/sounds/message-13716.mp3"));
    }

    if (hasPlayerWon || hasAssistantWon || isGameTie) setGameOver(true);
  }, [
    board,
    gameOver,
    isGameTie,
    sound,
    checkAndPlaySound,
    playerSymbol,
    assistantSymbol,
    scores,
  ]);

  useEffect(() => {
    if (isWin) {
      checkAndPlaySound(
        require("../public/sounds/dark-and-frightening-click-142377.mp3")
      );
    }
    if (openSettings) {
      checkAndPlaySound(require("../public/sounds/poit-94911.mp3"));
    }
  }, [isWin, openSettings, checkAndPlaySound]);

  const handleSquareClick = (symbol: any, index: number) => {
    if (typeof symbol === "string" || isAssistantTurn) return;
    if (isEmpty && !playerIsFirstToPlay) return;
    checkAndPlaySound(require("../public/sounds/notification-sound-7062.mp3"));
    const tempBoard = [...board];
    tempBoard[index] = playerSymbol;
    setBoard(tempBoard);
    setIsAssistantTurn(true);
  };

  const resetGame = () => {
    setBoard(defaultBoardState);
    setGameOver(false);
    setIsAssistantTurn(playerIsFirstToPlay);
    setPlayerIsFirstToPlay((prev) => !prev);
  };

  const getSquareTileClassName = (index: number) => {
    let className = "";
    if (isWin) {
      className += "board-win";
      if (getWinningIndexes(board).includes(index)) className += " " + "win";
    }
    if (isGameTie) className += "board-tie";

    return className;
  };

  const handleClearGame = () => {
    setScores(defaultGameScores);
    setPlayerIsFirstToPlay(true);
    setIsAssistantTurn(false);
    setGameOver(false);
    setBoard(defaultBoardState);
    localStorage.setItem(
      "tic-tac-toe-scores",
      JSON.stringify(defaultGameScores)
    );
    checkAndPlaySound(
      require("../public/sounds/error-call-to-attention-129258.mp3")
    );
  };

  const handleSetPlayerName = (e: ChangeEvent<HTMLInputElement>) => {
    setGameSettings({ ...gameSettings, name: e.target.value } as GameSettings);
    checkAndPlaySound(require("../public/sounds/cowbell_os_1-89685.mp3"));
  };

  const handleSymbolSelection = (symbol: string) => {
    setGameSettings({ ...gameSettings, symbol } as GameSettings);
    checkAndPlaySound(require("../public/sounds/message-13716.mp3"));
  };

  const handleSaveSettings = () => {
    if (!gameSettings) return;
    if (!gameSettings.name || !gameSettings.symbol) return;
    localStorage.setItem("tic-tac-toe-settings", JSON.stringify(gameSettings));
    setScores(defaultGameScores);
    setPlayerIsFirstToPlay(true);
    setIsAssistantTurn(false);
    setGameOver(false);
    setBoard(defaultBoardState);
    setOpenSettings(false);
    localStorage.setItem(
      "tic-tac-toe-scores",
      JSON.stringify(defaultGameScores)
    );
  };

  const handleSetSound = () => {
    const _settings = {
      ...gameSettings,
      sound: gameSettings.sound === "sound-on" ? "sound-off" : "sound-on",
    };
    setGameSettings(_settings as GameSettings);
    localStorage.setItem("tic-tac-toe-settings", JSON.stringify(_settings));
  };

  const handleSetDifficulty = () => {
    const _settings = {
      ...gameSettings,
      difficulty: gameSettings.difficulty === "easy" ? "hard" : "easy",
    };
    setGameSettings(_settings as GameSettings);
    localStorage.setItem("tic-tac-toe-settings", JSON.stringify(_settings));
  };

  const handleOpenSettings = () => setOpenSettings(true);

  return {
    gameSettings,
    openSettings,
    board,
    getSquareTileClassName,
    handleSquareClick,
    handleClearGame,
    assistantSymbol,
    scores,
    playerSymbol,
    resetGame,
    gameOver,
    handleSetPlayerName,
    handleSymbolSelection,
    handleSaveSettings,
    handleSetSound,
    handleSetDifficulty,
    handleOpenSettings,
    difficulty,
    sound,
  };
}
