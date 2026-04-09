import { createPlayScene } from "./playScene";

const TARGET_FPS = 60;
const TARGET_ELAPSED_TIME_IN_MS = 1000 / TARGET_FPS;
const IS_FIXED_TIME_STEP = true;

export const createGameApp = () => {
  const game = {
    canvas: null,
    canvasContext: null,
    currentScene: null,
  };

  const gameTime = {
    previousFrameTimeInMs: 0,
    accumulatedElapsedTimeInMs: 0,
    elapsedGameTimeInMs: 0,
    totalGameTimeInMs: 0,
  };

  const addCanvas = (canvasId) => {
    const canvas = document.getElementById(canvasId);

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      game.currentScene?.handleClick(x, y);
    });

    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      game.currentScene?.handleMouseMove(x, y);
    });

    game.canvas = canvas;
    game.canvasContext = canvas.getContext("2d");
  };

  const initialize = () => {
    game.currentScene = createPlayScene(game);
    game.currentScene.initialize();
  };

  const gameLoop = (currentFrameTimeInMs) => {
    const deltaTimeInMs = currentFrameTimeInMs - gameTime.previousFrameTimeInMs;

    // if (deltaTimeInMs >= TARGET_ELAPSED_TIME_IN_MS) {
    //   game.previousFrameTimeInMs =
    //     currentFrameTimeInMs - (deltaTimeInMs % TARGET_ELAPSED_TIME_IN_MS);

    //   update();
    // }

    gameTime.accumulatedElapsedTimeInMs += deltaTimeInMs;
    gameTime.previousFrameTimeInMs = currentFrameTimeInMs;

    if (IS_FIXED_TIME_STEP) {
      gameTime.elapsedGameTimeInMs = TARGET_ELAPSED_TIME_IN_MS;

      let stepCount = 0;

      while (gameTime.accumulatedElapsedTimeInMs >= TARGET_ELAPSED_TIME_IN_MS) {
        gameTime.totalGameTimeInMs += TARGET_ELAPSED_TIME_IN_MS;
        gameTime.accumulatedElapsedTimeInMs -= TARGET_ELAPSED_TIME_IN_MS;
        ++stepCount;

        update();
      }

      gameTime.elapsedGameTimeInMs = TARGET_ELAPSED_TIME_IN_MS * stepCount;
    } else {
      gameTime.elapsedGameTimeInMs = gameTime.accumulatedElapsedTimeInMs;
      gameTime.totalGameTimeInMs += gameTime.accumulatedElapsedTimeInMs;
      gameTime.accumulatedElapsedTimeInMs = 0;

      update();
    }

    draw();

    requestAnimationFrame(gameLoop);
  };

  const update = () => {
    const { currentScene } = game;

    currentScene.update(gameTime);
  };

  const draw = () => {
    const { canvas, canvasContext, currentScene } = game;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    currentScene.draw(gameTime);
  };

  const run = () => {
    initialize();

    gameTime.previousFrameTime = performance.now();

    gameLoop(0);
  };

  return {
    addCanvas,
    run,
  };
};
