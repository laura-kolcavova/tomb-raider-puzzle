import {
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../../../core/fourPillarsPuzzle/puzzle";

const PILLAR_PART_COLORS = [
  "#16a34a", // green
  "#1d4ed8", // blue
  "#dc2626", // red
  "#facc15", // yellow
];

const PILLAR_PART_COLOR_INDEXES = [
  [0, 1, 2, 3],
  [3, 0, 1, 2],
  [2, 3, 0, 1],
  [1, 2, 3, 0],
];

const LINE_WIDTH = 4;

export const drawSolveStateLines = (canvasContext, solveState, uiPillars) => {
  drawHorizontalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_TOP],
    uiPillars[POSITION_RIGHT_TOP],
    solveState[POSITION_LEFT_TOP],
    solveState[POSITION_RIGHT_TOP],
  );

  drawHorizontalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_BOTTOM],
    uiPillars[POSITION_RIGHT_BOTTOM],
    solveState[POSITION_LEFT_BOTTOM],
    solveState[POSITION_RIGHT_BOTTOM],
  );

  drawVerticalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_TOP],
    uiPillars[POSITION_LEFT_BOTTOM],
    solveState[POSITION_LEFT_TOP],
    solveState[POSITION_LEFT_BOTTOM],
  );

  drawVerticalLine(
    canvasContext,
    uiPillars[POSITION_RIGHT_TOP],
    uiPillars[POSITION_RIGHT_BOTTOM],
    solveState[POSITION_RIGHT_TOP],
    solveState[POSITION_RIGHT_BOTTOM],
  );
};

const drawHorizontalLine = (
  context,
  pillarA,
  pillarB,
  solveRotationStateA,
  solveRotationStateB,
) => {
  const startX = pillarA.centerX;
  const startY = pillarA.centerY;
  const endX = pillarB.centerX;
  const midX = (startX + endX) / 2;

  const colorIndexA = PILLAR_PART_COLOR_INDEXES[solveRotationStateA][1];
  const colorIndexB = PILLAR_PART_COLOR_INDEXES[solveRotationStateB][3];

  // Left half with colorA
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(midX, startY);
  context.strokeStyle = PILLAR_PART_COLORS[colorIndexA];
  context.lineWidth = LINE_WIDTH;
  context.stroke();

  // Right half with colorB
  context.beginPath();
  context.moveTo(midX, startY);
  context.lineTo(endX, startY);
  context.strokeStyle = PILLAR_PART_COLORS[colorIndexB];
  context.lineWidth = LINE_WIDTH;
  context.stroke();
};

const drawVerticalLine = (
  context,
  pillarA,
  pillarB,
  solveRotationStateA,
  solveRotationStateB,
) => {
  const startX = pillarA.centerX;
  const startY = pillarA.centerY;
  const endX = pillarB.centerX;
  const endY = pillarB.centerY;
  const midY = (startY + endY) / 2;

  const colorIndexA = PILLAR_PART_COLOR_INDEXES[solveRotationStateA][2];
  const colorIndexB = PILLAR_PART_COLOR_INDEXES[solveRotationStateB][0];

  // Top half with colorA
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(startX, midY);
  context.strokeStyle = PILLAR_PART_COLORS[colorIndexA];
  context.lineWidth = LINE_WIDTH;
  context.stroke();

  // Bottom half with colorB
  context.beginPath();
  context.moveTo(startX, midY);
  context.lineTo(endX, endY);
  context.strokeStyle = PILLAR_PART_COLORS[colorIndexB];
  context.lineWidth = LINE_WIDTH;
  context.stroke();
};
