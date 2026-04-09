export const createUiPillar = (position, centerX, centerY, radius) => {
  return {
    position,
    radius,
    centerX,
    centerY,
    isRotateMaster: false,
    isRotatingClockwise: false,
    isRotatingCounterClockwise: false,
    rotateAnimationProgress: 0,
  };
};

export const startUiPillarClockwiseRotation = (uiPillar, isMaster = false) => {
  uiPillar.isRotatingClockwise = true;
  uiPillar.isRotateMaster = isMaster;
  uiPillar.rotateAnimationProgress = 0;
};

export const startUiPillarCounterClockwiseRotation = (
  uiPillar,
  isMaster = false,
) => {
  uiPillar.isRotatingCounterClockwise = true;
  uiPillar.isRotateMaster = isMaster;
  uiPillar.rotateAnimationProgress = 0;
};

export const endUiPillarClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingClockwise = false;
  uiPillar.isRotateMaster = false;
  uiPillar.rotateAnimationProgress = 0;
};

export const endUiPillarCounterClockwiseRotation = (uiPillar) => {
  uiPillar.isRotatingCounterClockwise = false;
  uiPillar.isRotateMaster = false;
  uiPillar.rotateAnimationProgress = 0;
};

export const updateUiPillarRotateAnimationProgress = (uiPillar, step) => {
  const newRotateAnimationProgress = uiPillar.rotateAnimationProgress + step;

  uiPillar.rotateAnimationProgress = Math.min(1.0, newRotateAnimationProgress);
};
