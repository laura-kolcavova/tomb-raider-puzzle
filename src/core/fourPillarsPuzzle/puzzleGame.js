import { createPuzzle } from "./puzzle";

export const createPuzzleGame = () => {
  const puzzle = createPuzzle();

  const rotatePillarClockwise = (position) => {
    const pillar = puzzle.pillars[position];

    const connectedPositions = puzzle.connectedPositions[position];

    const connectedPillarA = puzzle.pillars[connectedPositions[0]];
    const connectedPillarB = puzzle.pillars[connectedPositions[1]];

    console.log("before", pillar);
    rotateClockwise(pillar);
    console.log("after", pillar);
    rotateClockwise(connectedPillarA);
    rotateClockwise(connectedPillarB);
  };

  const rotatePillarCounterClockwise = (position) => {
    const pillar = puzzle.pillars[position];

    const connectedPositions = puzzle.connectedPositions[position];

    const connectedPillarA = puzzle.pillars[connectedPositions[0]];
    const connectedPillarB = puzzle.pillars[connectedPositions[1]];

    rotateCounterClockwise(pillar);
    rotateCounterClockwise(connectedPillarA);
    rotateCounterClockwise(connectedPillarB);
  };

  return {
    puzzle,
    rotatePillarClockwise,
    rotatePillarCounterClockwise,
  };
};

const rotateClockwise = (pillar) => {
  if (pillar.rotationState === pillar.parts.length - 1) {
    pillar.rotationState = 0;

    return;
  }

  console.log(pillar.rotationState);
  pillar.rotationState++;
  console.log(pillar.rotationState);
};

const rotateCounterClockwise = (pillar) => {
  if (pillar.rotationState === 0) {
    pillar.rotationState === pillar.parts.length - 1;

    return;
  }

  pillar.rotationState--;
};
