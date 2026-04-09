export const drawSolvedOverlay = (canvasContext, uiPlayAgainButton) => {
  drawBackground(canvasContext);
  drawTitle(canvasContext);
  drawSubTitle(canvasContext);
  drawPlayAgainButton(canvasContext, uiPlayAgainButton);
};

const drawBackground = (canvasContext) => {
  const { canvas } = canvasContext;
  const { width, height } = canvas;

  canvasContext.fillStyle = "rgba(0, 0, 0, 0.75)";
  canvasContext.fillRect(0, 0, width, height);
};

const drawTitle = (canvasContext) => {
  const { canvas } = canvasContext;
  const { width, height } = canvas;

  canvasContext.fillStyle = "#ffffff";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.font = "700 38px 'Play', sans-serif";
  canvasContext.fillText("Puzzle Solved!", width / 2, height * 0.38);
};

const drawSubTitle = (canvasContext) => {
  const { canvas } = canvasContext;
  const { width, height } = canvas;

  canvasContext.fillStyle = "#d1fae5";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.font = "400 20px 'Play', sans-serif";
  canvasContext.fillText("All pillars are aligned.", width / 2, height * 0.5);
};

const drawPlayAgainButton = (canvasContext, uiPlayAgainButton) => {
  canvasContext.fillStyle = uiPlayAgainButton.isHover ? "#16a34a" : "#166534";
  canvasContext.beginPath();
  canvasContext.roundRect(
    uiPlayAgainButton.left,
    uiPlayAgainButton.top,
    uiPlayAgainButton.width,
    uiPlayAgainButton.height,
    8,
  );
  canvasContext.fill();

  canvasContext.fillStyle = "#ffffff";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.font = "700 18px 'Play', sans-serif";
  canvasContext.fillText(
    "Play Again",
    uiPlayAgainButton.centerX,
    uiPlayAgainButton.centerY,
  );
};
