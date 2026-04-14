import {
  POSITION_LEFT_BOTTOM,
  POSITION_LEFT_TOP,
  POSITION_RIGHT_BOTTOM,
  POSITION_RIGHT_TOP,
} from "../../core/fourPillarsPuzzle/puzzle";

const PILLAR_PART_COLORS = [
  "#36c85a", // green
  "#2f77ea", // blue
  "#ff2f45", // red
  "#f5d74b", // yellow
];

const PILLAR_PART_COLOR_INDEXES = [
  [0, 1, 2, 3],
  [3, 0, 1, 2],
  [2, 3, 0, 1],
  [1, 2, 3, 0],
];

const GLOW_LINE_WIDTH = 12;
const CORE_LINE_WIDTH = 6;
const SHINE_LINE_WIDTH = 2;

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

  drawLineSegment(
    context,
    startX,
    startY,
    midX,
    startY,
    PILLAR_PART_COLORS[colorIndexA],
  );

  drawLineSegment(
    context,
    midX,
    startY,
    endX,
    startY,
    PILLAR_PART_COLORS[colorIndexB],
  );
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

  drawLineSegment(
    context,
    startX,
    startY,
    startX,
    midY,
    PILLAR_PART_COLORS[colorIndexA],
  );

  drawLineSegment(
    context,
    startX,
    midY,
    endX,
    endY,
    PILLAR_PART_COLORS[colorIndexB],
  );
};

const drawLineSegment = (context, startX, startY, endX, endY, color) => {
  context.save();

  // context.shadowBlur = 12;
  // context.shadowColor = withAlpha(color, 0.65);
  // context.strokeStyle = withAlpha(color, 0.34);
  // context.lineWidth = GLOW_LINE_WIDTH;
  // context.beginPath();
  // context.moveTo(startX, startY);
  // context.lineTo(endX, endY);
  // context.stroke();

  context.shadowBlur = 0;
  context.strokeStyle = color;
  context.lineWidth = CORE_LINE_WIDTH;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();

  context.strokeStyle = "rgba(255, 255, 255, 0.45)";
  context.lineWidth = SHINE_LINE_WIDTH;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();

  context.restore();
};

const withAlpha = (hexColor, alpha) => {
  const red = Number.parseInt(hexColor.slice(1, 3), 16);
  const green = Number.parseInt(hexColor.slice(3, 5), 16);
  const blue = Number.parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
