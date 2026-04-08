import { randomBetween } from "../random";
import {
  createPillar,
  PILLAR_END_ROTATION_STATE,
  PILLAR_START_ROTATION_STATE,
} from "./pillar";

export const POSITION_LEFT_TOP = 0;
export const POSITION_RIGHT_TOP = 1;
export const POSITION_LEFT_BOTTOM = 2;
export const POSITION_RIGHT_BOTTOM = 3;

export const createPuzzle = () => {
  const puzzle = {};

  puzzle.pillars = initializePillars();

  puzzle.connectedPositions = initializeConnectedPositions();

  puzzle.solveState = [0, 0, 0, 0];

  puzzle.getPillar = (position) => {
    const pillar = puzzle.pillars[position];

    return pillar;
  };

  puzzle.getConnectedPositions = (position) => {
    const connectedPositions = puzzle.connectedPositions[position];

    return connectedPositions;
  };

  puzzle.getCurrentState = () => {
    const currentState = [];

    currentState[POSITION_LEFT_TOP] =
      puzzle.getPillar(POSITION_LEFT_TOP).rotationState;

    currentState[POSITION_RIGHT_TOP] =
      puzzle.getPillar(POSITION_RIGHT_TOP).rotationState;

    currentState[POSITION_RIGHT_BOTTOM] = puzzle.getPillar(
      POSITION_RIGHT_BOTTOM,
    ).rotationState;

    currentState[POSITION_LEFT_BOTTOM] =
      puzzle.getPillar(POSITION_LEFT_BOTTOM).rotationState;

    return currentState;
  };

  puzzle.checkIsSolved = () => {
    return solveStatesEquals(puzzle.solveState, puzzle.getCurrentState());
  };

  puzzle.setState = (newState) => {
    puzzle
      .getPillar(POSITION_LEFT_TOP)
      .setRotationState(newState[POSITION_LEFT_TOP]);

    puzzle
      .getPillar(POSITION_RIGHT_TOP)
      .setRotationState(newState[POSITION_RIGHT_TOP]);

    puzzle
      .getPillar(POSITION_RIGHT_BOTTOM)
      .setRotationState(newState[POSITION_RIGHT_BOTTOM]);

    puzzle
      .getPillar(POSITION_LEFT_BOTTOM)
      .setRotationState(newState[POSITION_LEFT_BOTTOM]);
  };

  puzzle.setSolveState = (newSolveState) => {
    puzzle.solveState = newSolveState;
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
    const oldState = puzzle.getCurrentState();

    let newState;

    do {
      newState = [];

      newState[POSITION_LEFT_TOP] = randomBetween(
        PILLAR_START_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );

      newState[POSITION_RIGHT_TOP] = randomBetween(
        PILLAR_START_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );

      newState[POSITION_RIGHT_BOTTOM] = randomBetween(
        PILLAR_START_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );

      newState[POSITION_LEFT_BOTTOM] = randomBetween(
        PILLAR_START_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );
    } while (
      solveStatesEquals(newState, oldState) ||
      solveStatesEquals(newState, puzzle.solveState)
    );

    puzzle.setState(newState);
  };

  puzzle.setRandomSolveState = () => {
    let newSolveState;

    do {
      const firstRotationState = randomBetween(
        PILLAR_START_ROTATION_STATE,
        PILLAR_END_ROTATION_STATE,
      );

      const secondRotationState =
        (firstRotationState + 2) % (PILLAR_END_ROTATION_STATE + 1);

      newSolveState = [];

      newSolveState[POSITION_LEFT_TOP] = firstRotationState;
      newSolveState[POSITION_RIGHT_TOP] = secondRotationState;
      newSolveState[POSITION_RIGHT_BOTTOM] = firstRotationState;
      newSolveState[POSITION_LEFT_BOTTOM] = secondRotationState;
    } while (
      solveStatesEquals(newSolveState, puzzle.getCurrentState()) ||
      solveStatesEquals(newSolveState, puzzle.solveState)
    );

    puzzle.setSolveState(newSolveState);
  };

  return puzzle;
};

const initializePillars = () => {
  const pillars = [];

  pillars[POSITION_LEFT_TOP] = createPillar(POSITION_LEFT_TOP);
  pillars[POSITION_RIGHT_TOP] = createPillar(POSITION_RIGHT_TOP);
  pillars[POSITION_RIGHT_BOTTOM] = createPillar(POSITION_RIGHT_BOTTOM);
  pillars[POSITION_LEFT_BOTTOM] = createPillar(POSITION_LEFT_BOTTOM);

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

  connectedPositions[POSITION_RIGHT_BOTTOM] = [
    POSITION_RIGHT_TOP,
    POSITION_LEFT_BOTTOM,
  ];

  connectedPositions[POSITION_LEFT_BOTTOM] = [
    POSITION_RIGHT_BOTTOM,
    POSITION_LEFT_TOP,
  ];

  return connectedPositions;
};

const solveStatesEquals = (solveStateA, solveStateB) => {
  for (let index = 0; index < solveStateA.length; index++) {
    if (solveStateA[index] !== solveStateB[index]) {
      return false;
    }
  }

  return true;
};
