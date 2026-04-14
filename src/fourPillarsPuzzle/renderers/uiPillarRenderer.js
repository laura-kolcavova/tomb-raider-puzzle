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

export const drawUiPillar = (canvasContext, uiPillar, rotationState) => {
  const {
    centerX,
    centerY,
    radius,
    isRotatingClockwise,
    isRotatingCounterClockwise,
    rotateAnimationProgress,
  } = uiPillar;

  const baseAngle = rotationState * (Math.PI / 2);

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
    canvasContext.beginPath();
    canvasContext.moveTo(centerX, centerY);
    canvasContext.arc(
      centerX,
      centerY,
      radius,
      startAngle + rotateAngle,
      endAngle + rotateAngle,
    );
    canvasContext.closePath();

    canvasContext.fillStyle = PILLAR_PART_COLORS[index];
    canvasContext.fill();
  });

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  canvasContext.strokeStyle = "#000000";
  canvasContext.lineWidth = 1;
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
  canvasContext.closePath();
  canvasContext.fillStyle = "#FFFFFF";
  canvasContext.fill();
  canvasContext.strokeStyle = "#000000";
  canvasContext.lineWidth = 1;
  canvasContext.stroke();
};
