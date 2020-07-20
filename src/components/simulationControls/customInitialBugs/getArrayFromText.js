import { rgbArrayRegExp, colorValueRegExp}  from "./regExp";
export const getArrayFromText = (text) => {
    const rgbColorStrings = text.match(rgbArrayRegExp)
    const result = rgbColorStrings.reduce((acc,colorString) => {
        const colorValuesArray = colorString.match(colorValueRegExp)
        return [...acc, colorValuesArray.map(value => parseInt(value))]
    },[])
    return result
}