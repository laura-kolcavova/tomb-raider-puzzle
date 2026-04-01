import { createPuzzle } from "./puzzle";

export const createPuzzleGame = () => {
  const puzzle = createPuzzle();

  const getPillar = (position) => {
    const pillar = puzzle.pillars[position];

    return pillar;
  };

  const getConnectedPositions = (position) => {
    const connectedPositions = puzzle.connectedPositions[position];

    return connectedPositions;
  };

  const rotatePillarClockwise = (position) => {
    const connectedPositions = getConnectedPositions(position);

    rotateSinglePillarClockwise(position);
    rotateSinglePillarClockwise(connectedPositions[0]);
    rotateSinglePillarClockwise(connectedPositions[1]);
  };

  const rotatePillarCounterClockwise = (position) => {
    const connectedPositions = getConnectedPositions(position);

    rotateSinglePillarCounterClockwise(position);
    rotateSinglePillarCounterClockwise(connectedPositions[0]);
    rotateSinglePillarCounterClockwise(connectedPositions[1]);
  };

  const rotateSinglePillarClockwise = (position) => {
    const pillar = getPillar(position);

    if (pillar.rotationState === pillar.parts.length - 1) {
      pillar.rotationState = 0;

      return;
    }

    pillar.rotationState++;
  };

  const rotateSinglePillarCounterClockwise = (position) => {
    const pillar = getPillar(position);

    if (pillar.rotationState === 0) {
      pillar.rotationState = pillar.parts.length - 1;

      return;
    }

    pillar.rotationState--;
  };

  return {
    puzzle,
    getPillar,
    getConnectedPositions,
    rotatePillarClockwise,
    rotatePillarCounterClockwise,
  };
};
