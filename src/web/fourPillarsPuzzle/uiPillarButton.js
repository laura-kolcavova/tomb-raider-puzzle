export const createUiPillarButton = (
  centerX,
  centerY,
  width,
  height,
  img,
  rotate,
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
    img,
    rotate,
    onClick,
  };
};
