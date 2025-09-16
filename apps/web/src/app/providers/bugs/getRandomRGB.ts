export default function getRandomRBG(): [number, number, number] {
  const newColor: [number, number, number] = [0, 0, 0];
  let i: number;
  for (i = 0; i < 3; i++) {
    newColor[i] = Math.ceil(Math.random() * 255);
  }
  return newColor;
}
