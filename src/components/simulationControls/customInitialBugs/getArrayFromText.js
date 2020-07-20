// import { rgbArrayRegExp, colorValueRegExp}  from "./regExp";
// export const getArrayFromText = (text) => {
//     const rgbColorStrings = text.match(rgbArrayRegExp)
//     const colorArray = rgbColorStrings.reduce((acc,colorString) => {
//         const colorValuesArray = colorString.match(colorValueRegExp)
//         return [...acc, colorValuesArray.map(value => parseInt(value))]
//     },[])
//     return {
//         colorArray,
//         clone: false
//     }
// }

import { rgbArrayRegExp, colorValueRegExp}  from "./regExp";
export const getArrayFromText = (text) => {
    const rgbColorStrings = text.match(rgbArrayRegExp)
    const colorArray = rgbColorStrings.map((colorString) => {
        const colorValuesArray = colorString.match(colorValueRegExp)
        const clone = colorString.match(/c/) ? true : false
        return {
            color: colorValuesArray.map(value => parseInt(value)),
            clone,
        }
    })
    return colorArray
}