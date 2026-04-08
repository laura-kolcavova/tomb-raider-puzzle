import {
  endUiPillarClockwiseRotation,
  endUiPillarCounterClockwiseRotation,
} from "../uiPillar";

export const createRotationUpdateHandler = (game, scene, puzzle) => {
  const handle = (gameTime) => {
    if (!scene.arePillarsRotating) {
      return;
    }

    const masterUiPillar = scene.uiPillars.find(
      (uiPillar) => uiPillar.isRotateMaster,
    );

    if (masterUiPillar.isRotatingClockwise) {
      handleClockwiseRotation(masterUiPillar);

      return;
    }

    if (masterUiPillar.isRotatingCounterClockwise) {
      handleCounterClockwiseRotation(masterUiPillar);

      return;
    }
  };

  const handleClockwiseRotation = (masterUiPillar) => {
    let allPillarsRotated = true;

    scene.uiPillars.forEach((uiPillar) => {
      if (!uiPillar.isRotatingClockwise) {
        return;
      }

      if (uiPillar.rotateAnimationProgress >= 1.0) {
        endUiPillarClockwiseRotation(uiPillar);
      } else {
        allPillarsRotated = false;
      }
    });

    if (allPillarsRotated) {
      puzzle.rotatePillarClockwise(masterUiPillar.position);
      scene.arePillarsRotating = false;
    }
  };

  const handleCounterClockwiseRotation = (masterUiPillar) => {
    let allPillarsRotated = true;

    scene.uiPillars.forEach((uiPillar) => {
      if (!uiPillar.isRotatingCounterClockwise) {
        return;
      }

      if (uiPillar.rotateAnimationProgress >= 1.0) {
        endUiPillarCounterClockwiseRotation(uiPillar);
      } else {
        allPillarsRotated = false;
      }
    });

    if (allPillarsRotated) {
      puzzle.rotatePillarCounterClockwise(masterUiPillar.position);
      scene.arePillarsRotating = false;
    }
  };

  return {
    handle,
  };
};
