import { drawUiPillarButton } from "../renderers/uiPillarButtonRenderer";
import { drawUiPillar } from "../renderers/uiPillarRenderer";
import { drawSolveStateLines } from "../renderers/solveStateLinesRenderer";

export const createRenderDrawHandler = (game, scene, puzzle) => {
  const handle = (gameTime) => {
    drawSolveStateLines(game.canvasContext, puzzle.solveState, scene.uiPillars);
    drawUiPillars();
    drawUiPillarButtons();
  };

  const drawUiPillars = () => {
    scene.uiPillars.forEach((uiPillar) => {
      const pillar = puzzle.getPillar(uiPillar.position);

      console.log(pillar, uiPillar.position);

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
