import {
  arrowClockwiseImage,
  arrowClockwiseHoverImage,
  arrowCounterClockwiseImage,
  arrowCounterClockwiseHoverImage,
  loadContent,
  restartHoverImage,
  restartImage,
} from "./contentManager";
import {
  createUiPillar,
  startUiPillarClockwiseRotation,
  startUiPillarCounterClockwiseRotation,
} from "./controls/uiPillar";
import {
  createPuzzle,
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../core/fourPillarsPuzzle/puzzle";
import { createAnimationUpdateHandler } from "./handlers/animationUpdateHandler";
import { createRenderDrawHandler } from "./handlers/renderDrawHandler";
import { createRotationUpdateHandler } from "./handlers/rotationUpdateHandler";
import {
  createUiButton,
  uiButtonIntersectsWithPoint,
} from "./controls/uiButton";
import {
  createUiImageButton,
  uiImageButtonIntersectsWithPoint,
} from "./controls/uiImageButton";

const PILLAR_RADIUS = 55;
const PILLARS_GAP_X = 220;
const PILLARS_GAP_Y = 220;

const TURN_BUTTON_SIZE = 46;
const TURN_BUTTON_DISTANCE_FROM_CENTER = 86;

const PLAY_AGAIN_BUTTON_WIDTH = 160;
const PLAY_AGAIN_BUTTON_HEIGHT = 44;
const PLAY_AGAIN_BUTTON_X_RATIO = 0.5;
const PLAY_AGAIN_BUTTON_Y_RATIO = 0.62;

const RESTART_BUTTON_WIDTH = 40;
const RESTART_BUTTON_HEIGHT = 40;
const RESTART_BUTTON_X_RATIO = 0.9;
const RESTART_BUTTON_Y_RATIO = 0.9;

const PILLAR_POSITION_MAP = {
  [POSITION_LEFT_TOP]: [0, 0],
  [POSITION_RIGHT_TOP]: [0, 1],
  [POSITION_LEFT_BOTTOM]: [1, 0],
  [POSITION_RIGHT_BOTTOM]: [1, 1],
};

export const ACTION_IDLE = "IDLE";
export const ACTION_ROTATING = "ROTATING";
export const ACTION_SOLVED = "SOLVED";

export const createPlayScene = (game) => {
  const scene = {};

  const puzzle = createPuzzle();

  const updateHandlers = [];

  const drawHandlers = [];

  const initialize = () => {
    loadContent();

    scene.uiPillars = createUiPillars();

    scene.uiPillarButtons = createUiPillarButtons();

    scene.uiPlayAgainButton = createUiPlayAgainButton();

    scene.uiRestartButton = createUiRestartButton();

    scene.action = ACTION_IDLE;

    puzzle.shufflePillars();
    puzzle.setRandomSolveState();

    updateHandlers.push(createAnimationUpdateHandler(game, scene));
    updateHandlers.push(createRotationUpdateHandler(game, scene, puzzle));

    drawHandlers.push(createRenderDrawHandler(game, scene, puzzle));
  };

  const update = (gameTime) => {
    updateHandlers.forEach((updateHandler) => {
      updateHandler.handle(gameTime);
    });
  };

  const draw = (gameTime) => {
    drawHandlers.forEach((drawHandler) => {
      drawHandler.handle(gameTime);
    });
  };

  const restart = () => {
    puzzle.shufflePillars();
    puzzle.setRandomSolveState();

    scene.uiPillars.forEach((uiPillar) => {
      uiPillar.isRotateMaster = false;
      uiPillar.isRotatingClockwise = false;
      uiPillar.isRotatingCounterClockwise = false;
      uiPillar.rotateAnimationProgress = 0;
    });

    scene.action = ACTION_IDLE;
  };

  const handleClick = (x, y) => {
    if (scene.action === ACTION_SOLVED) {
      if (uiButtonIntersectsWithPoint(scene.uiPlayAgainButton, x, y)) {
        scene.uiPlayAgainButton.onClick?.();

        return;
      }

      return;
    }

    if (
      scene.uiRestartButton.isVisible &&
      uiImageButtonIntersectsWithPoint(scene.uiRestartButton, x, y)
    ) {
      scene.uiRestartButton.onClick?.();

      return;
    }

    for (const uiPillarButton of scene.uiPillarButtons) {
      if (
        uiPillarButton.isVisible &&
        uiImageButtonIntersectsWithPoint(uiPillarButton, x, y)
      ) {
        uiPillarButton.onClick?.();

        return;
      }
    }
  };

  const handleMouseMove = (x, y) => {
    if (scene.action === ACTION_SOLVED) {
      if (uiButtonIntersectsWithPoint(scene.uiPlayAgainButton, x, y)) {
        if (!scene.uiPlayAgainButton.isHover) {
          scene.uiPlayAgainButton.isHover = true;

          game.canvas.style.cursor = "pointer";
        }
      } else {
        if (scene.uiPlayAgainButton.isHover) {
          scene.uiPlayAgainButton.isHover = false;

          game.canvas.style.cursor = "default";
        }
      }

      return;
    }

    const isRestartButtonHovered =
      scene.uiRestartButton.isVisible &&
      uiImageButtonIntersectsWithPoint(scene.uiRestartButton, x, y);

    scene.uiRestartButton.isHover = isRestartButtonHovered;

    let anyPillarButtonHovered = false;

    scene.uiPillars.forEach((uiPillar, index) => {
      const dx = x - uiPillar.centerX;
      const dy = y - uiPillar.centerY;
      const hoverRadius = uiPillar.radius * 2;

      const isNearPillar = Math.sqrt(dx * dx + dy * dy) <= hoverRadius;

      const clockwiseButton = scene.uiPillarButtons[index * 2];
      const counterClockwiseButton = scene.uiPillarButtons[index * 2 + 1];

      clockwiseButton.isVisible = isNearPillar;
      counterClockwiseButton.isVisible = isNearPillar;

      if (isNearPillar) {
        const isClockwiseHovered = uiImageButtonIntersectsWithPoint(
          clockwiseButton,
          x,
          y,
        );

        clockwiseButton.isHover = isClockwiseHovered;

        const isCounterClockwiseHovered = uiImageButtonIntersectsWithPoint(
          counterClockwiseButton,
          x,
          y,
        );

        counterClockwiseButton.isHover = isCounterClockwiseHovered;

        if (isClockwiseHovered || isCounterClockwiseHovered) {
          anyPillarButtonHovered = true;
        }
      } else {
        clockwiseButton.isHover = false;
        counterClockwiseButton.isHover = false;
      }
    });

    if (isRestartButtonHovered || anyPillarButtonHovered) {
      game.canvas.style.cursor = "pointer";
    } else {
      game.canvas.style.cursor = "default";
    }
  };

  const rotateUiPillarClockwise = (uiPillar) => {
    if (scene.action !== ACTION_IDLE) {
      return;
    }

    const connectedPositions = puzzle.getConnectedPositions(uiPillar.position);

    const slaveUiPillarA = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[0],
    );

    const slaveUiPillarB = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[1],
    );

    startUiPillarClockwiseRotation(uiPillar, true);
    startUiPillarClockwiseRotation(slaveUiPillarA);
    startUiPillarClockwiseRotation(slaveUiPillarB);

    scene.action = ACTION_ROTATING;
  };

  const rotateUiPillarCounterClockwise = (uiPillar) => {
    if (scene.action !== ACTION_IDLE) {
      return;
    }

    const connectedPositions = puzzle.getConnectedPositions(uiPillar.position);

    const slaveUiPillarA = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[0],
    );

    const slaveUiPillarB = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[1],
    );

    startUiPillarCounterClockwiseRotation(uiPillar, true);
    startUiPillarCounterClockwiseRotation(slaveUiPillarA);
    startUiPillarCounterClockwiseRotation(slaveUiPillarB);

    scene.action = ACTION_ROTATING;
  };

  const createUiPillars = () => {
    const pillarOffsetX =
      (game.canvas.width - (PILLARS_GAP_X + PILLAR_RADIUS * 2)) / 2 +
      PILLAR_RADIUS;
    const pillarOffsetY =
      (game.canvas.height - (PILLARS_GAP_Y + PILLAR_RADIUS * 2)) / 2 +
      PILLAR_RADIUS;

    const uiPillars = puzzle.pillars.map((pillar) => {
      const pillarMappedPosition = PILLAR_POSITION_MAP[pillar.position];

      const row = pillarMappedPosition[0];
      const col = pillarMappedPosition[1];

      const centerX = pillarOffsetX + col * PILLARS_GAP_X;
      const centerY = pillarOffsetY + row * PILLARS_GAP_Y;

      return createUiPillar(pillar.position, centerX, centerY, PILLAR_RADIUS);
    });

    return uiPillars;
  };

  const createUiPillarButtons = () => {
    const uiPillarButtons = [];

    scene.uiPillars.forEach((uiPillar) => {
      const turnClockwiseButton = createTurnClockwiseButton(uiPillar);
      turnClockwiseButton.isVisible = false;

      const turnCounterClockwiseButton =
        createTurnCounterClockwiseButton(uiPillar);
      turnCounterClockwiseButton.isVisible = false;

      uiPillarButtons.push(turnClockwiseButton);
      uiPillarButtons.push(turnCounterClockwiseButton);
    });

    return uiPillarButtons;
  };

  const createTurnClockwiseButton = (uiPillar) => {
    const pillarAngle = -Math.PI / 4;

    const centerX =
      uiPillar.centerX +
      Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    const centerY =
      uiPillar.centerY +
      Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    return createUiImageButton(
      centerX,
      centerY,
      TURN_BUTTON_SIZE,
      TURN_BUTTON_SIZE,
      arrowClockwiseImage,
      arrowClockwiseHoverImage,
      () => rotateUiPillarClockwise(uiPillar),
    );
  };

  const createTurnCounterClockwiseButton = (uiPillar, puzzle) => {
    const pillarAngle = -Math.PI + Math.PI / 4;

    const centerX =
      uiPillar.centerX +
      Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    const centerY =
      uiPillar.centerY +
      Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    return createUiImageButton(
      centerX,
      centerY,
      TURN_BUTTON_SIZE,
      TURN_BUTTON_SIZE,
      arrowCounterClockwiseImage,
      arrowCounterClockwiseHoverImage,
      () => rotateUiPillarCounterClockwise(uiPillar),
    );
  };

  const createUiPlayAgainButton = () => {
    const centerX = game.canvas.width * PLAY_AGAIN_BUTTON_X_RATIO;
    const centerY = game.canvas.height * PLAY_AGAIN_BUTTON_Y_RATIO;

    return createUiButton(
      centerX,
      centerY,
      PLAY_AGAIN_BUTTON_WIDTH,
      PLAY_AGAIN_BUTTON_HEIGHT,
      "Play Again",
      () => {
        restart();
      },
    );
  };

  const createUiRestartButton = () => {
    const centerX = game.canvas.width * RESTART_BUTTON_X_RATIO;
    const centerY = game.canvas.height * RESTART_BUTTON_Y_RATIO;

    return createUiImageButton(
      centerX,
      centerY,
      RESTART_BUTTON_WIDTH,
      RESTART_BUTTON_HEIGHT,
      restartImage,
      restartHoverImage,
      () => {
        restart();
      },
    );
  };

  return {
    initialize,
    update,
    draw,
    handleClick,
    handleMouseMove,
  };
};
