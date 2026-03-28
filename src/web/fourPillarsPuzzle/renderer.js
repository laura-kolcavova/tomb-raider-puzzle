const PILLAR_PART_COLORS = [
  "#16a34a", // green
  "#1d4ed8", // blue
  "#dc2626", // red
  "#facc15", // yellow
];

const PILLAR_STROKE_COLOR = "#111827";

const PILLAR_STROKE_WIDTH = 3;

export const drawUiPillar = (context, uiPillar) => {
  const { centerX, centerY, radius, pillar } = uiPillar;

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

export const drawUiPillarButton = (context, uiPillarButton) => {
  const { centerX, centerY, width, height, img, rotate } = uiPillarButton;

  const halfX = width / 2;
  const halfY = height / 2;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotate);

  context.drawImage(img, -halfX, -halfY, width, height);

  context.restore();
};
