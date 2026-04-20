export const drawUiImageButton = (canvasContext, uiImageButton) => {
  const {
    centerX,
    centerY,
    width,
    height,
    image,
    hoverImage,
    isHover,
    isVisible,
  } = uiImageButton;

  if (!isVisible) {
    return;
  }

  const halfX = width / 2;
  const halfY = height / 2;

  const imageToDraw = isHover ? hoverImage : image;

  canvasContext.save();

  canvasContext.translate(centerX, centerY);

  canvasContext.drawImage(imageToDraw, -halfX, -halfY, width, height);

  canvasContext.restore();
};
