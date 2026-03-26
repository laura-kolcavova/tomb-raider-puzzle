import {
  arrowClockwiseImage,
  arrowCounterClockwiseImage,
} from "./contentManager";

const PILLAR_PART_COLORS = [
  "#16a34a", // green
  "#1d4ed8", // blue
  "#dc2626", // red
  "#facc15", // yellow
];

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

const TURN_BUTTON_SIZE = 46;
const TURN_BUTTON_DISTANCE_FROM_CENTER = 86;

export const drawPillars = (context, pillars) => {
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

    drawPillar(context, pillar, centerX, centerY, radius);
    drawTurnButtons(context, pillar, centerX, centerY);
  });
};

const drawPillar = (context, pillar, centerX, centerY, radius) => {
  const parts = pillar.parts[pillar.rotationState];

  const quarterAngles = [
    [-Math.PI, -Math.PI / 2],
    [-Math.PI / 2, 0],
    [0, Math.PI / 2],
    [Math.PI / 2, Math.PI],
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

const drawTurnButtons = (context, pillar, centerX, centerY) => {
  const parts = pillar.parts[pillar.rotationState];

  const clockwisePartIndex = parts.indexOf(0);
  const counterClockwisePartIndex = parts.indexOf(3);

  const getButtonPosition = (partIndex) => {
    const angle = -Math.PI / 4 + (Math.PI / 2) * partIndex;

    return {
      x: centerX + Math.cos(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER,
      y: centerY + Math.sin(angle) * TURN_BUTTON_DISTANCE_FROM_CENTER,
    };
  };

  const clockwisePosition = getButtonPosition(clockwisePartIndex);
  const counterClockwisePosition = getButtonPosition(counterClockwisePartIndex);

  drawTurnCounterClockwiseButton(
    context,
    counterClockwisePosition.x,
    counterClockwisePosition.y,
  );

  drawTurnClockwiseButton(context, clockwisePosition.x, clockwisePosition.y);
};

const drawTurnClockwiseButton = (context, x, y) => {
  if (!arrowClockwiseImage.complete || arrowClockwiseImage.naturalWidth === 0) {
    return;
  }

  const half = TURN_BUTTON_SIZE / 2;

  context.save();
  context.translate(x, y);
  context.rotate(-(45 * Math.PI) / 180);

  context.drawImage(
    arrowClockwiseImage,
    -half,
    -half,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
  );

  context.restore();
};

const drawTurnCounterClockwiseButton = (context, x, y) => {
  if (
    !arrowCounterClockwiseImage.complete ||
    arrowCounterClockwiseImage.naturalWidth === 0
  ) {
    return;
  }

  const half = TURN_BUTTON_SIZE / 2;

  context.save();
  context.translate(x, y);
  context.rotate((45 * Math.PI) / 180);

  context.drawImage(
    arrowCounterClockwiseImage,
    -half,
    -half,
    TURN_BUTTON_SIZE,
    TURN_BUTTON_SIZE,
  );

  context.restore();
};
