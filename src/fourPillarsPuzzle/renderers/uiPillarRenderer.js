const PILLAR_PART_COLORS = [
  "#36c85a", // green
  "#2f77ea", // blue
  "#ff2f45", // red
  "#f5d74b", // yellow
];

const PILLAR_PART_ANGLES = [
  [-Math.PI, -Math.PI / 2], // green
  [-Math.PI / 2, 0], // blue
  [0, Math.PI / 2], // red
  [Math.PI / 2, Math.PI], // yellow
];

const PILLAR_OFFSET_ANGLE = Math.PI / 4;

export const drawUiPillar = (canvasContext, uiPillar, pillar) => {
  const {
    centerX,
    centerY,
    radius,
    isRotatingClockwise,
    isRotatingCounterClockwise,
    rotateAnimationProgress,
  } = uiPillar;

  const baseAngle = pillar.rotationState * (Math.PI / 2);

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

  drawShades(canvasContext, uiPillar);

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

const drawShades = (canvasContext, uiPillar) => {
  const { centerX, centerY, radius } = uiPillar;

  const domeGradient = canvasContext.createRadialGradient(
    centerX + radius * 0.1,
    centerY + radius * 0.1,
    0,
    centerX,
    centerY,
    radius,
  );
  domeGradient.addColorStop(0.0, "rgba(0, 0, 0, 0.00)");
  domeGradient.addColorStop(0.7, "rgba(0, 0, 0, 0.00)");
  domeGradient.addColorStop(1.0, "rgba(0, 0, 0, 0.16)");
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  canvasContext.fillStyle = domeGradient;
  canvasContext.fill();

  const glossX = centerX - radius * 0.15;
  const glossY = centerY - radius * 0.3;
  const glossGradient = canvasContext.createRadialGradient(
    glossX,
    glossY,
    0,
    glossX,
    glossY,
    radius * 0.95,
  );
  glossGradient.addColorStop(0.0, "rgba(255, 255, 255, 0.34)");
  glossGradient.addColorStop(0.55, "rgba(255, 255, 255, 0.08)");
  glossGradient.addColorStop(1.0, "rgba(255, 255, 255, 0.00)");
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  canvasContext.fillStyle = glossGradient;
  canvasContext.fill();

  // const sparkleGradient = canvasContext.createRadialGradient(
  //   centerX - radius * 0.26,
  //   centerY - radius * 0.4,
  //   0,
  //   centerX - radius * 0.26,
  //   centerY - radius * 0.4,
  //   radius * 0.24,
  // );
  // sparkleGradient.addColorStop(0.0, "rgba(255, 255, 255, 0.28)");
  // sparkleGradient.addColorStop(1.0, "rgba(255, 255, 255, 0.00)");
  // canvasContext.beginPath();
  // canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  // canvasContext.fillStyle = sparkleGradient;
  // canvasContext.fill();
};
