import { createPillar } from "./pillar";

export const POSITION_LEFT_TOP = 0;
export const POSITION_RIGHT_TOP = 1;
export const POSITION_LEFT_BOTTOM = 2;
export const POSITION_RIGHT_BOTTOM = 3;

export const createPuzzle = () => {
  const isSolved = false;

  const pillars = [];

  pillars[POSITION_LEFT_TOP] = createPillar(POSITION_LEFT_TOP);
  pillars[POSITION_RIGHT_TOP] = createPillar(POSITION_RIGHT_TOP);
  pillars[POSITION_LEFT_BOTTOM] = createPillar(POSITION_LEFT_BOTTOM);
  pillars[POSITION_RIGHT_BOTTOM] = createPillar(POSITION_RIGHT_BOTTOM);

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

  return {
    isSolved,
    pillars,
    connectedPositions,
  };
};
