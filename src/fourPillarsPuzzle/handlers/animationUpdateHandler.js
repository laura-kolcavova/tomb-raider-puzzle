import { ACTION_ROTATING } from "../playScene";
import { updateUiPillarRotateAnimationProgress } from "../controls/uiPillar";

const PILLAR_ROTATE_ANIMATION_DURATION_IN_MS = 1000;

export const createAnimationUpdateHandler = (game, scene) => {
  const handle = (gameTime) => {
    if (scene.action !== ACTION_ROTATING) {
      return;
    }

    scene.uiPillars.forEach((uiPillar) => {
      if (uiPillar.isRotatingClockwise) {
        handleUiPillarClockwiseRotation(gameTime, uiPillar);

        return;
      }

      if (uiPillar.isRotatingCounterClockwise) {
        handleUiPillarCounterClockwiseRotation(gameTime, uiPillar);

        return;
      }
    });
  };

  const handleUiPillarClockwiseRotation = (gameTime, uiPillar) => {
    const deltaTime = gameTime.elapsedGameTimeInMs;

    const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

    updateUiPillarRotateAnimationProgress(uiPillar, step);
  };

  const handleUiPillarCounterClockwiseRotation = (gameTime, uiPillar) => {
    const deltaTime = gameTime.elapsedGameTimeInMs;

    const step = deltaTime / PILLAR_ROTATE_ANIMATION_DURATION_IN_MS;

    updateUiPillarRotateAnimationProgress(uiPillar, step);
  };

  return {
    handle,
  };
};
