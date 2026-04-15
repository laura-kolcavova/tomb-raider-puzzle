import { drawUiPillar } from "../renderers/uiPillarRenderer";
import { drawSolveStateLines } from "../renderers/solveStateLinesRenderer";
import { ACTION_SOLVED } from "../playScene";
import { drawSolvedOverlay } from "../renderers/solvedOverlayRenderer";
import { drawUiImageButton } from "../renderers/uiImageButtonRenderer";

export const createRenderDrawHandler = (game, scene, puzzle) => {
  const handle = (gameTime) => {
    drawSolveStateLines(
      game.canvasContext,
      scene.uiPillars,
      puzzle.solveState,
      puzzle.getCurrentState(),
    );
    drawUiPillars();
    drawUiPillarButtons();
    drawUiImageButton(game.canvasContext, scene.uiRestartButton);

    if (scene.action === ACTION_SOLVED) {
      drawSolvedOverlay(game.canvasContext, scene.uiPlayAgainButton);
    }
  };

  const drawUiPillars = () => {
    scene.uiPillars.forEach((uiPillar) => {
      const pillar = puzzle.getPillar(uiPillar.position);

      drawUiPillar(game.canvasContext, uiPillar, pillar);
    });
  };

  const drawUiPillarButtons = () => {
    scene.uiPillarButtons.forEach((uiPillarButton) => {
      drawUiImageButton(game.canvasContext, uiPillarButton);
    });
  };

  return {
    handle,
  };
};
