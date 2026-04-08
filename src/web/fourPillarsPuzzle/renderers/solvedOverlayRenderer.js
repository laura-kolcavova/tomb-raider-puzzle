const PLAY_AGAIN_BUTTON_WIDTH = 160;
const PLAY_AGAIN_BUTTON_HEIGHT = 44;
const PLAY_AGAIN_BUTTON_Y_RATIO = 0.62;

export const getPlayAgainButtonBounds = (canvas) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height * PLAY_AGAIN_BUTTON_Y_RATIO;
  return {
    left: centerX - PLAY_AGAIN_BUTTON_WIDTH / 2,
    right: centerX + PLAY_AGAIN_BUTTON_WIDTH / 2,
    top: centerY - PLAY_AGAIN_BUTTON_HEIGHT / 2,
    bottom: centerY + PLAY_AGAIN_BUTTON_HEIGHT / 2,
  };
};

export const drawSolvedOverlay = (canvasContext, isPlayAgainHover = false) => {
  canvasContext.save();

  drawBackground(canvasContext);
  drawTitle(canvasContext);
  drawSubTitle(canvasContext);
  drawPlayAgainButton(canvasContext, isPlayAgainHover);

  canvasContext.restore();
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
  canvasContext.font = "bold 38px 'Comic Sans MS', 'Comic Sans', serif";
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.fillText("Puzzle Solved!", width / 2, height * 0.38);
};

const drawSubTitle = (canvasContext) => {
  const { canvas } = canvasContext;
  const { width, height } = canvas;

  canvasContext.font = "20px 'Comic Sans MS', 'Comic Sans', serif";
  canvasContext.fillStyle = "#d1fae5";
  canvasContext.fillText("All pillars are aligned.", width / 2, height * 0.5);
};

const drawPlayAgainButton = (canvasContext, isPlayAgainHover) => {
  const { canvas } = canvasContext;
  const { width, height } = canvas;

  const bounds = getPlayAgainButtonBounds(canvas);

  canvasContext.fillStyle = isPlayAgainHover ? "#16a34a" : "#166534";
  canvasContext.beginPath();
  canvasContext.roundRect(
    bounds.left,
    bounds.top,
    PLAY_AGAIN_BUTTON_WIDTH,
    PLAY_AGAIN_BUTTON_HEIGHT,
    8,
  );
  canvasContext.fill();

  canvasContext.fillStyle = "#ffffff";
  canvasContext.font = "bold 18px 'Comic Sans MS', 'Comic Sans', serif";
  canvasContext.fillText(
    "Play Again",
    width / 2,
    height * PLAY_AGAIN_BUTTON_Y_RATIO,
  );
};
