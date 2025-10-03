export default function getWidth(): number {
  const w: number =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return w;
}
