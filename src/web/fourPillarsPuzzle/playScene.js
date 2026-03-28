import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { loadContent } from "./contentManager";
import { createUiPillar } from "./uiPillar";
import { createUiPillarButton } from "./uiPillarButton";
import {
  arrowClockwiseImage,
  arrowCounterClockwiseImage,
} from "./contentManager";
import { drawUiPillar, drawUiPillarButton } from "./renderer";
import {
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../../core/fourPillarsPuzzle/puzzle";

const PILLAR_RADIUS = 55;
const PILLAR_OFFSET_X = 220;
const PILLAR_OFFSET_Y = 120;

const PILLAR_POSITION_MAP = {
  [POSITION_LEFT_TOP]: [0, 0],
  [POSITION_RIGHT_TOP]: [0, 1],
  [POSITION_LEFT_BOTTOM]: [1, 0],
  [POSITION_RIGHT_BOTTOM]: [1, 1],
};

const PILLARS_GAP_X = 220;
const PILLARS_GAP_Y = 170;

const TURN_BUTTON_SIZE = 46;
const TURN_BUTTON_DISTANCE_FROM_CENTER = 86;

export const createPlayScene = (game) => {
  const scene = {
    puzzleGame: null,
    uiPillars: [],
    uiPillarButtons: [],
  };

  const initialize = () => {
    loadContent();

    scene.puzzleGame = createPuzzleGame();

    scene.uiPillars = createUiPillars(scene.puzzleGame.puzzle.pillars);

    scene.uiPillarButtons = createUiPillarButtons(
      scene.uiPillars,
      scene.puzzleGame,
    );
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

  const update = (gameTime) => {};

  const draw = (gameTime) => {
    drawUiPillars(game.canvasContext, scene.uiPillars);
    drawUiPillarButtons(game.canvasContext, scene.uiPillarButtons);
  };

  return {
    initialize,
    update,
    draw,
    handleClick,
  };
};

const createUiPillars = (pillars) => {
  const uiPillars = pillars.map((pillar) => {
    const pillarMappedPosition = PILLAR_POSITION_MAP[pillar.position];

    const row = pillarMappedPosition[0];
    const col = pillarMappedPosition[1];

    const centerX = PILLAR_OFFSET_X + col * PILLARS_GAP_X;
    const centerY = PILLAR_OFFSET_Y + row * PILLARS_GAP_Y;

    return createUiPillar(pillar, centerX, centerY, PILLAR_RADIUS);
  });

  return uiPillars;
};

const createUiPillarButtons = (uiPillars, puzzleGame) => {
  const uiPillarButtons = [];

  uiPillars.forEach((uiPillar) => {
    const turnClockwiseButton = createTurnClockwiseButton(uiPillar, puzzleGame);
    const turnCounterClockwiseButton = createTurnCounterClockwiseButton(
      uiPillar,
      puzzleGame,
    );

    uiPillarButtons.push(turnClockwiseButton);
    uiPillarButtons.push(turnCounterClockwiseButton);
  });

  return uiPillarButtons;
};

const createTurnClockwiseButton = (uiPillar, puzzleGame) => {
  const { pillar } = uiPillar;

  const pillarAngle = -Math.PI / 4;

  const centerX =
    uiPillar.centerX + Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;
  const centerY =
    uiPillar.centerY + Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = -(45 * Math.PI) / 180;

  const onClick = () => {
    puzzleGame.rotatePillarClockwise(pillar.position);
  };

  return createUiPillarButton(
    centerX,
    centerY,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowClockwiseImage,
    rotate,
    onClick,
  );
};

const createTurnCounterClockwiseButton = (uiPillar, puzzleGame) => {
  const { pillar } = uiPillar;

  const pillarAngle = -Math.PI + Math.PI / 4;

  const centerX =
    uiPillar.centerX + Math.cos(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const centerY =
    uiPillar.centerY + Math.sin(pillarAngle) * TURN_BUTTON_DISTANCE_FROM_CENTER;

  const rotate = (45 * Math.PI) / 180;

  const onClick = () => {
    puzzleGame.rotatePillarCounterClockwise(pillar.position);
  };

  return createUiPillarButton(
    centerX,
    centerY,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
    arrowCounterClockwiseImage,
    rotate,
    onClick,
  );
};

const drawUiPillars = (context, uiPillars) => {
  uiPillars.forEach((uiPillar) => {
    drawUiPillar(context, uiPillar);
  });
};

const drawUiPillarButtons = (context, uiPillarButtons) => {
  uiPillarButtons.forEach((uiPillarButton) => {
    drawUiPillarButton(context, uiPillarButton);
  });
};
