export const drawUiPillarButton = (canvasContext, uiPillarButton) => {
  const { centerX, centerY, width, height, img, rotate, isHover } =
    uiPillarButton;

  const halfX = width / 2;
  const halfY = height / 2;

  canvasContext.save();
  canvasContext.translate(centerX, centerY);
  canvasContext.rotate(rotate);

  canvasContext.beginPath();
  canvasContext.arc(0, 0, Math.min(halfX, halfY), 0, 2 * Math.PI);
  canvasContext.fillStyle = isHover ? "#bfdbfe" : "#e5e7eb";
  canvasContext.fill();

  canvasContext.drawImage(img, -halfX, -halfY, width, height);

  canvasContext.restore();
};
