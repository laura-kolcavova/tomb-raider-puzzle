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

  drawPillarBase(canvasContext, centerX, centerY, radius);

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

  drawPillarGloss(canvasContext, centerX, centerY, radius);

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  canvasContext.strokeStyle = "#000000";
  canvasContext.lineWidth = 1;
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI);
  canvasContext.strokeStyle = "rgba(255, 255, 255, 0.75)";
  canvasContext.lineWidth = 2;
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
  canvasContext.closePath();
  canvasContext.fillStyle = "#FFFFFF";
  canvasContext.fill();
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
  canvasContext.strokeStyle = "rgba(255, 255, 255, 0.85)";
  canvasContext.lineWidth = 2;
  canvasContext.stroke();
  canvasContext.strokeStyle = "#000000";
  canvasContext.lineWidth = 1;
  canvasContext.stroke();
};

const drawPillarBase = (canvasContext, centerX, centerY, radius) => {
  canvasContext.save();
  canvasContext.shadowColor = "rgba(148, 163, 184, 0.35)";
  canvasContext.shadowBlur = radius * 0.45;
  canvasContext.shadowOffsetX = radius * 0.08;
  canvasContext.shadowOffsetY = radius * 0.14;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius * 1.08, 0, 2 * Math.PI);
  canvasContext.fillStyle = "rgba(255, 255, 255, 0.92)";
  canvasContext.fill();
  canvasContext.restore();

  const rimGradient = canvasContext.createRadialGradient(
    centerX - radius * 0.28,
    centerY - radius * 0.34,
    radius * 0.18,
    centerX,
    centerY,
    radius * 1.14,
  );

  rimGradient.addColorStop(0, "rgba(255, 255, 255, 0.96)");
  rimGradient.addColorStop(0.72, "rgba(255, 255, 255, 0.82)");
  rimGradient.addColorStop(1, "rgba(203, 213, 225, 0.45)");

  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius * 1.05, 0, 2 * Math.PI);
  canvasContext.fillStyle = rimGradient;
  canvasContext.fill();
};

const drawPillarGloss = (canvasContext, centerX, centerY, radius) => {
  canvasContext.save();
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  canvasContext.clip();

  const topLight = canvasContext.createRadialGradient(
    centerX - radius * 0.42,
    centerY - radius * 0.48,
    radius * 0.1,
    centerX - radius * 0.22,
    centerY - radius * 0.24,
    radius * 1.12,
  );

  topLight.addColorStop(0, "rgba(255, 255, 255, 0.62)");
  topLight.addColorStop(0.34, "rgba(255, 255, 255, 0.28)");
  topLight.addColorStop(1, "rgba(255, 255, 255, 0)");

  canvasContext.fillStyle = topLight;
  canvasContext.fillRect(
    centerX - radius,
    centerY - radius,
    radius * 2,
    radius * 2,
  );

  const edgeShade = canvasContext.createLinearGradient(
    centerX - radius,
    centerY - radius,
    centerX + radius,
    centerY + radius,
  );

  edgeShade.addColorStop(0, "rgba(255, 255, 255, 0.12)");
  edgeShade.addColorStop(0.52, "rgba(255, 255, 255, 0)");
  edgeShade.addColorStop(1, "rgba(0, 0, 0, 0.18)");

  canvasContext.fillStyle = edgeShade;
  canvasContext.fillRect(
    centerX - radius,
    centerY - radius,
    radius * 2,
    radius * 2,
  );

  canvasContext.restore();
};
