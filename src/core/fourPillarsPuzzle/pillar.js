export const createPillar = (position) => {
  return {
    position: position,
    rotationState: 0,
    parts: [
      [0, 1, 2, 3],
      [3, 0, 1, 2],
      [2, 3, 0, 1],
      [1, 2, 3, 0],
    ],
  };
};
