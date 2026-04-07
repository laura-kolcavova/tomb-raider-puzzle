import { randomBetween } from "../random";
import {
  createPillar,
  PILLAR_END_ROTATION_STATE,
  PILLAR_INITIAL_ROTATION_STATE,
} from "./pillar";

export const POSITION_LEFT_TOP = 0;
export const POSITION_RIGHT_TOP = 1;
export const POSITION_LEFT_BOTTOM = 2;
export const POSITION_RIGHT_BOTTOM = 3;

export const createPuzzle = () => {
  const puzzle = {};

  puzzle.isSolved = false;

  puzzle.solveState = [0, 0, 0, 0];

  puzzle.pillars = initializePillars([0, 0, 0, 0]);

  puzzle.connectedPositions = initializeConnectedPositions();

  puzzle.getPillar = (position) => {
    const pillar = puzzle.pillars[position];

    return pillar;
  };

  puzzle.getConnectedPositions = (position) => {
    const connectedPositions = puzzle.connectedPositions[position];

    return connectedPositions;
  };

  puzzle.rotatePillarClockwise = (position) => {
    const connectedPositions = puzzle.getConnectedPositions(position);

    const masterPillar = puzzle.getPillar(position);
    const slavePillarA = puzzle.getPillar(connectedPositions[0]);
    const slavePillarB = puzzle.getPillar(connectedPositions[1]);

    masterPillar.rotateClockwise();
    slavePillarA.rotateClockwise();
    slavePillarB.rotateClockwise();
  };

  puzzle.rotatePillarCounterClockwise = (position) => {
    const connectedPositions = puzzle.getConnectedPositions(position);

    const masterPillar = puzzle.getPillar(position);
    const slavePillarA = puzzle.getPillar(connectedPositions[0]);
    const slavePillarB = puzzle.getPillar(connectedPositions[1]);

    masterPillar.rotateCounterClockwise();
    slavePillarA.rotateCounterClockwise();
    slavePillarB.rotateCounterClockwise();
  };

  puzzle.shufflePillars = () => {
    puzzle.pillars.forEach((pillar) => {
      const newRotationState = randomBetween(
        PILLAR_INITIAL_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );

      pillar.setRotationState(newRotationState);
    });
  };

  puzzle.setRandomSolveState = () => {
    const firstRotationState = randomBetween(
      PILLAR_INITIAL_ROTATION_STATE,
      PILLAR_END_ROTATION_STATE,
    );

    const secondRotationState =
      (firstRotationState + 2) % (PILLAR_END_ROTATION_STATE + 1);

    puzzle.solveState = [
      firstRotationState,
      secondRotationState,
      secondRotationState,
      firstRotationState,
    ];
  };

  return puzzle;
};

const initializePillars = (initialState) => {
  const pillars = [];

  pillars[POSITION_LEFT_TOP] = createPillar(POSITION_LEFT_TOP, initialState[0]);

  pillars[POSITION_RIGHT_TOP] = createPillar(
    POSITION_RIGHT_TOP,
    initialState[1],
  );

  pillars[POSITION_LEFT_BOTTOM] = createPillar(
    POSITION_LEFT_BOTTOM,
    initialState[2],
  );

  pillars[POSITION_RIGHT_BOTTOM] = createPillar(
    POSITION_RIGHT_BOTTOM,
    initialState[3],
  );

  return pillars;
};

const initializeConnectedPositions = () => {
  const connectedPositions = [];

  connectedPositions[POSITION_LEFT_TOP] = [
    POSITION_LEFT_BOTTOM,
    POSITION_RIGHT_TOP,
  ];

  connectedPositions[POSITION_RIGHT_TOP] = [
    POSITION_LEFT_TOP,
    POSITION_RIGHT_BOTTOM,
  ];

  connectedPositions[POSITION_LEFT_BOTTOM] = [
    POSITION_RIGHT_BOTTOM,
    POSITION_LEFT_TOP,
  ];

  connectedPositions[POSITION_RIGHT_BOTTOM] = [
    POSITION_RIGHT_TOP,
    POSITION_LEFT_BOTTOM,
  ];

  return connectedPositions;
};
