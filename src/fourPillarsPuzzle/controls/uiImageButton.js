export const createUiImageButton = (
  centerX,
  centerY,
  width,
  height,
  image,
  hoverImage,
  onClick,
) => {
  const left = centerX - width / 2;
  const top = centerY - height / 2;
  const right = centerX + width / 2;
  const bottom = centerY + height / 2;

  return {
    centerX,
    centerY,
    left,
    top,
    right,
    bottom,
    width,
    height,
    image,
    hoverImage,
    onClick,
    isHover: false,
    isVisible: true,
  };
};

export const uiImageButtonIntersectsWithPoint = (uiImageButton, x, y) => {
  return (
    x >= uiImageButton.left &&
    x <= uiImageButton.right &&
    y >= uiImageButton.top &&
    y <= uiImageButton.bottom
  );
};
