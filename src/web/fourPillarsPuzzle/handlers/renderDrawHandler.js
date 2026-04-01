import { drawUiPillarButton } from "../renderers/uiPillarButtonRenderer";
import { drawUiPillar } from "../renderers/uiPillarRenderer";

export const createRenderDrawHandler = (game, scene, puzzleGame) => {
  const handle = (gameTime) => {
    drawUiPillars();
    drawUiPillarButtons();
  };

  const drawUiPillars = () => {
    scene.uiPillars.forEach((uiPillar) => {
      drawUiPillar(game.canvasContext, puzzleGame, uiPillar);
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
