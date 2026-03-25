import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { drawPillars } from "./renderer";

const TARGET_FPS = 60;
const TARGET_ELAPSED_TIME_IN_MS = 1000 / TARGET_FPS;
const IS_FIXED_TIME_STEP = true;

export const createGameApp = () => {
  const game = {
    canvas: null,
    canvasContext: null,
    puzzleGame: null,
    previousFrameTimeInMs: 0,
    accumulatedElapsedTimeInMs: 0,
    elapsedGameTimeInMs: 0,
    totalGameTimeInMs: 0,
  };

  const addCanvas = (canvasId) => {
    game.canvas = document.getElementById(canvasId);
    game.canvasContext = game.canvas.getContext("2d");
  };

  const run = () => {
    game.puzzleGame = createPuzzleGame();

    game.previousFrameTime = performance.now();

    gameLoop(game, 0);
  };

  const gameLoop = (currentFrameTimeInMs) => {
    const deltaTimeInMs = currentFrameTimeInMs - game.previousFrameTimeInMs;

    game.accumulatedElapsedTimeInMs += deltaTimeInMs;
    game.previousFrameTimeInMs = currentFrameTimeInMs;

    if (IS_FIXED_TIME_STEP) {
      game.elapsedGameTimeInMs = TARGET_ELAPSED_TIME_IN_MS;

      let stepCount = 0;

      while (game.accumulatedElapsedTimeInMs >= TARGET_ELAPSED_TIME_IN_MS) {
        game.totalGameTimeInMs += TARGET_ELAPSED_TIME_IN_MS;
        game.accumulatedElapsedTimeInMs -= TARGET_ELAPSED_TIME_IN_MS;
        ++stepCount;

        update(game);
      }

      game.elapsedGameTimeInMs = TARGET_ELAPSED_TIME_IN_MS * stepCount;
      // if (deltaTimeInMs >= TARGET_ELAPSED_TIME_IN_MS) {
      //   game.previousFrameTimeInMs =
      //     currentFrameTimeInMs - (deltaTimeInMs % TARGET_ELAPSED_TIME_IN_MS);

      //   update(game);
      // }
    } else {
      game.elapsedGameTimeInMs = game.accumulatedElapsedTimeInMs;
      game.totalGameTimeInMs += game.accumulatedElapsedTimeInMs;
      game.accumulatedElapsedTimeInMs = 0;

      update(game);
    }

    draw(game);

    requestAnimationFrame(gameLoop);
  };

  return {
    addCanvas,
    run,
  };
};

const update = (game) => {};

const draw = (game) => {
  const { canvas, canvasContext, puzzleGame } = game;

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  drawPillars(canvasContext, puzzleGame.puzzle.pillars);
};
