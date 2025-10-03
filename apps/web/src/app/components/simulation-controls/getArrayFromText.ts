import { v4 as uuid } from 'uuid';
import type { PopulationSnapshot } from '@/app/providers/bugs/BugsProvider';
import { colorValueRegExp, rgbArrayRegExp } from './regExp';

export const getArrayFromText = (text: string): PopulationSnapshot => {
  const rgbColorStrings = text.match(rgbArrayRegExp);
  if (!rgbColorStrings) return [];

  const colorArray = rgbColorStrings.map((colorString: string) => {
    const colorValuesArray = colorString.match(colorValueRegExp);
    if (!colorValuesArray || colorValuesArray.length < 3)
      return {
        color: [0, 0, 0] as [number, number, number],
        clone: false,
        id: uuid(),
      };

    const clone = colorString.match(/c/) ? true : false;
    return {
      color: [
        parseInt(colorValuesArray[0]),
        parseInt(colorValuesArray[1]),
        parseInt(colorValuesArray[2]),
      ] as [number, number, number],
      clone,
      id: uuid(),
    };
  });
  return colorArray;
};
