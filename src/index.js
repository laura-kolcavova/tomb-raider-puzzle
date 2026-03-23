import { createPuzzleGame } from "./core/fourPillarsPuzzle/puzzleGame";

const { puzzle, rotatePillarClockwise, rotatePillarCounterClockwise } =
  createPuzzleGame();

console.log("tombRaiderPuzzle is available in the console");

console.log(puzzle);

rotatePillarClockwise(puzzle.pillars[0].position);

console.log(puzzle);

rotatePillarClockwise(puzzle.pillars[0].position);

console.log(puzzle);

rotatePillarClockwise(puzzle.pillars[0].position);

console.log(puzzle);
