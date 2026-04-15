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

export const drawSolveStateLines = (
  canvasContext,
  uiPillars,
  solveState,
  currentState,
) => {
  drawHorizontalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_TOP],
    uiPillars[POSITION_RIGHT_TOP],
    solveState,
    currentState,
  );

  drawHorizontalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_BOTTOM],
    uiPillars[POSITION_RIGHT_BOTTOM],
    solveState,
    currentState,
  );

  drawVerticalLine(
    canvasContext,
    uiPillars[POSITION_LEFT_TOP],
    uiPillars[POSITION_LEFT_BOTTOM],
    solveState,
    currentState,
  );

  drawVerticalLine(
    canvasContext,
    uiPillars[POSITION_RIGHT_TOP],
    uiPillars[POSITION_RIGHT_BOTTOM],
    solveState,
    currentState,
  );
};

const drawHorizontalLine = (
  context,
  uiPillarA,
  uiPillarB,
  solveState,
  currentState,
) => {
  const solveRotationStateA = solveState[uiPillarA.position];
  const solveRotationStateB = solveState[uiPillarB.position];

  const currentRotationStateA = currentState[uiPillarA.position];
  const currentRotationStateB = currentState[uiPillarB.position];

  const startX = uiPillarA.centerX;
  const startY = uiPillarA.centerY;
  const endX = uiPillarB.centerX;
  const midX = (startX + endX) / 2;

  const colorIndexA = PILLAR_PART_COLOR_INDEXES[solveRotationStateA][1];
  const colorIndexB = PILLAR_PART_COLOR_INDEXES[solveRotationStateB][3];

  const arePillarsAligned =
    currentRotationStateA === solveRotationStateA &&
    currentRotationStateB === solveRotationStateB;

  drawLineSegment(
    context,
    startX,
    startY,
    midX,
    startY,
    PILLAR_PART_COLORS[colorIndexA],
    arePillarsAligned,
  );

  drawLineSegment(
    context,
    midX,
    startY,
    endX,
    startY,
    PILLAR_PART_COLORS[colorIndexB],
    arePillarsAligned,
  );
};

const drawVerticalLine = (
  context,
  uiPillarA,
  uiPillarB,
  solveState,
  currentState,
) => {
  const solveRotationStateA = solveState[uiPillarA.position];
  const solveRotationStateB = solveState[uiPillarB.position];

  const currentRotationStateA = currentState[uiPillarA.position];
  const currentRotationStateB = currentState[uiPillarB.position];

  const startX = uiPillarA.centerX;
  const startY = uiPillarA.centerY;
  const endY = uiPillarB.centerY;
  const midY = (startY + endY) / 2;

  const colorIndexA = PILLAR_PART_COLOR_INDEXES[solveRotationStateA][2];
  const colorIndexB = PILLAR_PART_COLOR_INDEXES[solveRotationStateB][0];

  const arePillarsAligned =
    currentRotationStateA === solveRotationStateA &&
    currentRotationStateB === solveRotationStateB;

  drawLineSegment(
    context,
    startX,
    startY,
    startX,
    midY,
    PILLAR_PART_COLORS[colorIndexA],
    arePillarsAligned,
  );

  drawLineSegment(
    context,
    startX,
    midY,
    startX,
    endY,
    PILLAR_PART_COLORS[colorIndexB],
    arePillarsAligned,
  );
};

const drawLineSegment = (
  context,
  startX,
  startY,
  endX,
  endY,
  color,
  isGlowing,
) => {
  context.save();

  if (isGlowing) {
    context.shadowBlur = 12;
    context.shadowColor = withAlpha(color, 0.65);
    context.strokeStyle = withAlpha(color, 0.34);
    context.lineWidth = GLOW_LINE_WIDTH;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }

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
