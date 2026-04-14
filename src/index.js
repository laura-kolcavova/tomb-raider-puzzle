import { createGameApp } from "./fourPillarsPuzzle/gameApp";

window.addEventListener("load", () => {
  const gameApp = createGameApp();

  gameApp.addCanvas("gameCanvas");

  gameApp.run();
});
