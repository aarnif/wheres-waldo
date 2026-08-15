import useWindowDimensions from "./useWindowDimensions";

interface Dimensions {
  width: number;
  height: number;
}

const useCanvasDimensions = (imageDimensions: Dimensions) => {
  const windowDimensions = useWindowDimensions();

  const imageAspectRatio = imageDimensions.width / imageDimensions.height;
  const windowAspectRatio = windowDimensions.width / windowDimensions.height;
  const shouldFillHeight = imageAspectRatio >= windowAspectRatio;

  const canvasHeight = shouldFillHeight
    ? windowDimensions.height
    : windowDimensions.width / imageAspectRatio;
  const canvasWidth = shouldFillHeight
    ? windowDimensions.height * imageAspectRatio
    : windowDimensions.width;

  return {
    width: `${(canvasWidth / windowDimensions.width) * 100}vw`,
    height: `${(canvasHeight / windowDimensions.height) * 100}vh`,
  };
};

export default useCanvasDimensions;
