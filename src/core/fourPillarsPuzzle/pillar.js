export const PILLAR_INITIAL_ROTATION_STATE = 0;
export const PILLAR_END_ROTATION_STATE = 3;

export const createPillar = (position) => {
  const pillar = {};

  pillar.position = position;

  pillar.rotationState = PILLAR_INITIAL_ROTATION_STATE;

  pillar.setRotationState = (newRotationState) => {
    pillar.rotationState = newRotationState;
  };

  pillar.rotateClockwise = () => {
    if (pillar.rotationState === PILLAR_END_ROTATION_STATE) {
      pillar.rotationState = PILLAR_INITIAL_ROTATION_STATE;

      return;
    }

    pillar.rotationState++;
  };

  pillar.rotateCounterClockwise = () => {
    if (pillar.rotationState === PILLAR_INITIAL_ROTATION_STATE) {
      pillar.rotationState = PILLAR_END_ROTATION_STATE;

      return;
    }

    pillar.rotationState--;
  };

  return pillar;
};
