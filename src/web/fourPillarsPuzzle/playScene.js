import { createPuzzleGame } from "../../core/fourPillarsPuzzle/puzzleGame";
import { loadContent } from "./contentManager";
import { drawPillars } from "./renderer";

export const createPlayScene = (game) => {
  const scene = {
    puzzleGame: null,
  };

  const initialize = () => {
    loadContent();

    scene.puzzleGame = createPuzzleGame();
  };

  const update = (gameTime) => {};

  const draw = (gameTime) => {
    drawPillars(game.canvasContext, scene.puzzleGame.puzzle.pillars);
  };

  return {
    initialize,
    update,
    draw,
  };
};
