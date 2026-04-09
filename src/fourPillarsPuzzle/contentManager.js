import arrowClockwiseUrl from "../images/arrow_clockwise.svg";
import arrowCounterClockwiseUrl from "../images/arrow_counterclockwise.svg";

export let arrowClockwiseImage = null;

export let arrowCounterClockwiseImage = null;

export const loadContent = () => {
  arrowClockwiseImage = loadImage(arrowClockwiseUrl);
  arrowCounterClockwiseImage = loadImage(arrowCounterClockwiseUrl);
};

const loadImage = (url) => {
  const img = new Image();

  img.src = url;

  return img;
};
