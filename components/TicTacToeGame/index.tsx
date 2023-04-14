import {
  RiVolumeUpFill as VolumeUp,
  RiVolumeMuteFill as VolumeMute,
} from "react-icons/ri";
import { HiOutlineCog as SettingsIcon } from "react-icons/hi";
import cx from "clsx";

import { getPosition, SquareTile } from "./utils";
import { useTicTacToeLogic } from "@/hooks/useTicTacToeLogic";

import styles from "@/styles/tictactoe.module.scss";

export const TicTacToeGame = () => {
  const {
    gameSettings,
    handleSetPlayerName,
    handleSymbolSelection,
    handleSaveSettings,
    handleSetSound,
    handleSetDifficulty,
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
    difficulty,
    sound,
    handleOpenSettings,
  } = useTicTacToeLogic();

  return (
    <section className={styles.wrapper}>
      <header>
        <div>
          <h2>
            Tic-Tac-Toe
            <span onClick={handleOpenSettings}>
              <SettingsIcon />
            </span>
          </h2>
        </div>
        <div onClick={handleSetSound}>
          {sound ? <VolumeUp /> : <VolumeMute />}
        </div>
      </header>
      <div className={styles.toggle_switch}>
        <div>
          <input
            type="checkbox"
            id="switch"
            name="switch"
            checked={difficulty === "hard"}
            onChange={handleSetDifficulty}
          />
          <label htmlFor="switch" className={styles.switch_label}></label>
        </div>
      </div>
      <section className={styles.board_section}>
        <div className={styles.board}>
          {board.map((square: string | null, index: number) => {
            return (
              <SquareTile
                key={`square-${index}`}
                position={getPosition(index)}
                symbol={square}
                className={getSquareTileClassName(index)}
                onClick={() => handleSquareClick(square, index)}
              />
            );
          })}
        </div>
        <div
          className={cx(styles.restart, gameOver && styles.block)}
          onClick={resetGame}
        ></div>
      </section>
      <section className={styles.score_board}>
        <div className={styles.score_board_inner}>
          <div>
            {gameSettings.name || "Player"}({playerSymbol})
            <span className={styles.score}>{scores.playerScore}</span>
          </div>
          <div>
            Ties
            <span className={styles.score}>{scores.tieScore}</span>
          </div>
          <div>
            Assistant({assistantSymbol})
            <span className={styles.score}>{scores.assistantScore}</span>
          </div>
        </div>
        <div className={styles.end_game} onClick={handleClearGame}>
          <p>Clear Game</p>
        </div>
      </section>
      {openSettings && (
        <div className={styles.settings_prompt}>
          <div className={styles.settings_box}>
            <div className={styles.name_set}>
              <label htmlFor="player-name">{"What's"} your name?</label>
              <input
                type="text"
                name="player-name"
                id="player-name"
                placeholder="Enter your name"
                onChange={handleSetPlayerName}
                maxLength={8}
                autoComplete="off"
                value={!gameSettings ? "" : gameSettings.name}
              />
            </div>
            <div className={styles.symbol_selector}>
              <label>Choose a symbol</label>
              <div className={styles.symbols}>
                <div
                  onClick={() => handleSymbolSelection("x")}
                  className={
                    gameSettings && gameSettings.symbol === "x"
                      ? styles.blink
                      : ""
                  }
                >
                  <span>X</span>
                  {gameSettings && gameSettings.symbol === "x" && (
                    <small>selected</small>
                  )}
                </div>
                <div
                  onClick={() => handleSymbolSelection("o")}
                  className={
                    gameSettings && gameSettings.symbol === "o"
                      ? styles.blink
                      : ""
                  }
                >
                  <span>O</span>
                  {gameSettings && gameSettings.symbol === "o" && (
                    <small>selected</small>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.all_done}>
              <button onClick={handleSaveSettings}>Done</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
