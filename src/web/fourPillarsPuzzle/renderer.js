const PILLAR_PART_COLORS = {
  0: "#1d4ed8",
  1: "#dc2626",
  2: "#facc15",
  3: "#16a34a",
};

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

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

const drawTurnButtons = (context, centerX, centerY, radius) => {
  const horizontalOffset = radius + 46;
  const buttonCenterY = centerY;

  drawTurnButton(
    context,
    centerX - horizontalOffset,
    buttonCenterY,
    "counterclockwise",
  );

  drawTurnButton(
    context,
    centerX + horizontalOffset,
    buttonCenterY,
    "clockwise",
  );
};
