import { drawUiPillarButton } from "../renderers/uiPillarButtonRenderer";
import { drawUiPillar } from "../renderers/uiPillarRenderer";
import { drawSolveStateLines } from "../renderers/solveStateLinesRenderer";
import { ACTION_SOLVED } from "../playScene";
import { drawSolvedOverlay } from "../renderers/solvedOverlayRenderer";

export const createRenderDrawHandler = (game, scene, puzzle) => {
  const handle = (gameTime) => {
    drawSolveStateLines(game.canvasContext, puzzle.solveState, scene.uiPillars);
    drawUiPillars();
    drawUiPillarButtons();

    if (scene.action === ACTION_SOLVED) {
      drawSolvedOverlay(game.canvasContext, scene.uiPlayAgainButton);
    }
  };

  const drawUiPillars = () => {
    scene.uiPillars.forEach((uiPillar) => {
      const pillar = puzzle.getPillar(uiPillar.position);

      drawUiPillar(game.canvasContext, uiPillar, pillar.rotationState);
    });
  };

  const drawUiPillarButtons = () => {
    scene.uiPillarButtons.forEach((uiPillarButton) => {
      drawUiPillarButton(game.canvasContext, uiPillarButton);
    });
  };

  return {
    handle,
  };
};
