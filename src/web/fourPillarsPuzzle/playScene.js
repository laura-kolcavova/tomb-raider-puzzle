import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { loadContent } from "./contentManager";
import {
  createUiPillar,
  startUiPillarClockwiseRotation,
  startUiPillarCounterClockwiseRotation,
} from "./uiPillar";
import { createUiPillarButton } from "./uiPillarButton";
import {
  arrowClockwiseImage,
  arrowCounterClockwiseImage,
} from "./contentManager";
import {
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../../core/fourPillarsPuzzle/puzzle";
import { createAnimationUpdateHandler } from "./handlers/animationUpdateHandler";
import { createRenderDrawHandler } from "./handlers/renderDrawHandler";
import { createRotationUpdateHandler } from "./handlers/rotationUpdateHandler";

const PILLAR_RADIUS = 55;
const PILLARS_GAP_X = 220;
const PILLARS_GAP_Y = 220;

const TURN_BUTTON_SIZE = 46;
const TURN_BUTTON_DISTANCE_FROM_CENTER = 86;

const PILLAR_POSITION_MAP = {
  [POSITION_LEFT_TOP]: [0, 0],
  [POSITION_RIGHT_TOP]: [0, 1],
  [POSITION_LEFT_BOTTOM]: [1, 0],
  [POSITION_RIGHT_BOTTOM]: [1, 1],
};

export const createPlayScene = (game) => {
  const scene = {
    uiPillars: [],
    uiPillarButtons: [],
    arePillarsRotating: false,
  };

  const puzzleGame = createPuzzleGame();

  const updateHandlers = [];

  const drawHandlers = [];

  const initialize = () => {
    loadContent();

    scene.uiPillars = createUiPillars();

    scene.uiPillarButtons = createUiPillarButtons();

    updateHandlers.push(createAnimationUpdateHandler(game, scene));
    updateHandlers.push(createRotationUpdateHandler(game, scene, puzzleGame));

    drawHandlers.push(createRenderDrawHandler(game, scene, puzzleGame));
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

  const handleClick = (x, y) => {
    for (const uiPillarButton of scene.uiPillarButtons) {
      if (
        x >= uiPillarButton.left &&
        x <= uiPillarButton.right &&
        y >= uiPillarButton.top &&
        y <= uiPillarButton.bottom
      ) {
        uiPillarButton.onClick?.();

        return;
      }
    }
  };

  const handleMouseMove = (x, y) => {
    for (const uiPillarButton of scene.uiPillarButtons) {
      const isIntersect =
        x >= uiPillarButton.left &&
        x <= uiPillarButton.right &&
        y >= uiPillarButton.top &&
        y <= uiPillarButton.bottom;

      if (isIntersect && !uiPillarButton.isHover) {
        uiPillarButton.isHover = true;
        game.canvas.style.cursor = "pointer";

        return;
      }

      if (!isIntersect && uiPillarButton.isHover) {
        uiPillarButton.isHover = false;
        game.canvas.style.cursor = "default";

        return;
      }
    }
  };

  const rotateUiPillarClockwise = (uiPillar) => {
    if (scene.arePillarsRotating) {
      return;
    }

    const connectedPositions = puzzleGame.getConnectedPositions(
      uiPillar.position,
    );

    const slaveUiPillarA = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[0],
    );

    const slaveUiPillarB = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[1],
    );

    startUiPillarClockwiseRotation(uiPillar, true);
    startUiPillarClockwiseRotation(slaveUiPillarA);
    startUiPillarClockwiseRotation(slaveUiPillarB);

    scene.arePillarsRotating = true;
  };

  const rotateUiPillarCounterClockwise = (uiPillar) => {
    if (scene.arePillarsRotating) {
      return;
    }

    const connectedPositions = puzzleGame.getConnectedPositions(
      uiPillar.position,
    );

    const slaveUiPillarA = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[0],
    );

    const slaveUiPillarB = scene.uiPillars.find(
      (slaveUiPillar) => slaveUiPillar.position === connectedPositions[1],
    );

    startUiPillarCounterClockwiseRotation(uiPillar, true);
    startUiPillarCounterClockwiseRotation(slaveUiPillarA);
    startUiPillarCounterClockwiseRotation(slaveUiPillarB);

    scene.arePillarsRotating = true;
  };

  const createUiPillars = () => {
    const pillarOffsetX =
      (game.canvas.width - (PILLARS_GAP_X + PILLAR_RADIUS * 2)) / 2 +
      PILLAR_RADIUS;
    const pillarOffsetY =
      (game.canvas.height - (PILLARS_GAP_Y + PILLAR_RADIUS * 2)) / 2 +
      PILLAR_RADIUS;

    const uiPillars = puzzleGame.puzzle.pillars.map((pillar) => {
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

      const turnCounterClockwiseButton =
        createTurnCounterClockwiseButton(uiPillar);

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

    const rotate = -(45 * Math.PI) / 180;

    return createUiPillarButton(
      centerX,
      centerY,
      TURN_BUTTON_SIZE,
      TURN_BUTTON_SIZE,
      arrowClockwiseImage,
      rotate,
      () => rotateUiPillarClockwise(uiPillar),
    );
  };

  const createTurnCounterClockwiseButton = (uiPillar, puzzleGame) => {
    const pillarAngle = -Math.PI + Math.PI / 4;

    const centerX =
      uiPillar.centerX +
      Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    const centerY =
      uiPillar.centerY +
      Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

    const rotate = (45 * Math.PI) / 180;

    return createUiPillarButton(
      centerX,
      centerY,
      TURN_BUTTON_SIZE,
      TURN_BUTTON_SIZE,
      arrowCounterClockwiseImage,
      rotate,
      () => rotateUiPillarCounterClockwise(uiPillar),
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
