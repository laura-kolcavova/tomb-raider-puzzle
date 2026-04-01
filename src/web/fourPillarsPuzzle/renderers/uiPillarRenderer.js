const PILLAR_PART_COLORS = [
  "#16a34a", // green
  "#1d4ed8", // blue
  "#dc2626", // red
  "#facc15", // yellow
];

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

export const drawUiPillar = (context, puzzleGame, uiPillar) => {
  const {
    position,
    centerX,
    centerY,
    radius,
    isRotatingClockwise,
    isRotatingCounterClockwise,
    rotateAnimationProgress,
  } = uiPillar;

  const pillar = puzzleGame.getPillar(position);

  const parts = pillar.parts[pillar.rotationState];

  const quarterAngles = [
    [-Math.PI, -Math.PI / 2],
    [-Math.PI / 2, 0],
    [0, Math.PI / 2],
    [Math.PI / 2, Math.PI],
  ];

  const offsetAngle = Math.PI / 4;

  let rotateAngle = 0;

  if (isRotatingClockwise) {
    rotateAngle = rotateAnimationProgress * (Math.PI / 2);
  } else if (isRotatingCounterClockwise) {
    rotateAngle = -rotateAnimationProgress * (Math.PI / 2);
  }

  quarterAngles.forEach(([startAngle, endAngle], index) => {
    const partValue = parts[index];

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      radius,
      startAngle + offsetAngle + rotateAngle,
      endAngle + offsetAngle + rotateAngle,
    );
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
