interface ContainerOffset {
  left: number;
  top: number;
}

export default function getContainerOffset(
  svgContainerRef?: React.RefObject<HTMLElement | null>
): ContainerOffset {
  return {
    left: svgContainerRef?.current?.offsetLeft ?? 0,
    top: svgContainerRef?.current?.offsetTop ?? 0,
  };
}
