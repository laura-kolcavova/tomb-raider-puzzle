export const createGameApp = () => {
  const game = {};

  const addCanvas = (canvasId) => {
    game.canvas = document.getElementById(canvasId);
    game.canvasContext = game.canvas.getContext("2d");
  };

  const run = () => {
    gameLoop();
  };

  return {
    addCanvas,
    run,
  };
};

const gameLoop = (game) => {
  update(game);
  draw(game);

  requestAnimationFrame(() => {
    gameLoop(game);
  });
};

const update = (game) => {};

const draw = (game) => {};
