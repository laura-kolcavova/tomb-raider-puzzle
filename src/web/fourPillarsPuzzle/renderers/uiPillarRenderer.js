const PILLAR_PART_COLORS = [
  "#16a34a", // green
  "#1d4ed8", // blue
  "#dc2626", // red
  "#facc15", // yellow
];

const PILLAR_PART_ANGLES = [
  [-Math.PI, -Math.PI / 2], // green
  [-Math.PI / 2, 0], // blue
  [0, Math.PI / 2], // red
  [Math.PI / 2, Math.PI], // yellow
];

const PILLAR_OFFSET_ANGLE = Math.PI / 4;

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

export const drawUiPillar = (context, uiPillar, rotationState) => {
  const {
    centerX,
    centerY,
    radius,
    isRotatingClockwise,
    isRotatingCounterClockwise,
    rotateAnimationProgress,
  } = uiPillar;

  const baseAngle = rotationState * (Math.PI / 2);

  console.log(rotationState);

  let animationAngle;

  if (isRotatingClockwise) {
    animationAngle = +rotateAnimationProgress * (Math.PI / 2);
  } else if (isRotatingCounterClockwise) {
    animationAngle = -rotateAnimationProgress * (Math.PI / 2);
  } else {
    animationAngle = 0;
  }

  const rotateAngle = baseAngle + animationAngle + PILLAR_OFFSET_ANGLE;

  PILLAR_PART_ANGLES.forEach(([startAngle, endAngle], index) => {
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(
      centerX,
      centerY,
      radius,
      startAngle + rotateAngle,
      endAngle + rotateAngle,
    );
    context.closePath();

    context.fillStyle = PILLAR_PART_COLORS[index];
    context.fill();
  });

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.strokeStyle = PILLAR_STROKE_COLOR;
  context.lineWidth = PILLAR_STROKE_WIDTH;
  context.stroke();
};
