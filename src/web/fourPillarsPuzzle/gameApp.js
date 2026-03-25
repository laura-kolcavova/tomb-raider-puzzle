import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";

const PILLAR_PART_COLORS = {
  0: "#1d4ed8",
  1: "#dc2626",
  2: "#facc15",
  3: "#16a34a",
};

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

export const createGameApp = () => {
  const game = {
    canvas: null,
    canvasContext: null,
    puzzleGame: null,
  };

  const addCanvas = (canvasId) => {
    game.canvas = document.getElementById(canvasId);
    game.canvasContext = game.canvas.getContext("2d");
  };

  const build = () => {
    game.puzzleGame = createPuzzleGame();
  };

  const run = () => {
    build();
    gameLoop(game);
  };

  return {
    addCanvas,
    run,
    build,
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

const draw = (game) => {
  const { canvas, canvasContext, puzzleGame } = game;

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  drawPillars(puzzleGame.puzzle.pillars);
};

const drawPillars = (pillars) => {
  const radius = 55;
  const offsetX = 220;
  const offsetY = 120;
  const gapX = 220;
  const gapY = 170;

  pillars.forEach((pillar, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);

    const centerX = offsetX + col * gapX;
    const centerY = offsetY + row * gapY;

    drawPillar(canvasContext, pillar, centerX, centerY, radius);
  });
};

const drawPillar = (context, pillar, centerX, centerY, radius) => {
  const parts = pillar.parts[pillar.rotationState];

  const quarterAngles = [
    [-Math.PI / 2, 0],
    [0, Math.PI / 2],
    [Math.PI / 2, Math.PI],
    [Math.PI, (3 * Math.PI) / 2],
  ];

  quarterAngles.forEach(([startAngle, endAngle], index) => {
    const partValue = parts[index];

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.closePath();

    context.fillStyle = PILLAR_PART_COLORS[partValue];
    context.fill();
  });

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.strokeStyle = PILLAR_STROKE_COLOR;
  context.lineWidth = PILLAR_STROKE_WIDTH;
  context.stroke();
};
