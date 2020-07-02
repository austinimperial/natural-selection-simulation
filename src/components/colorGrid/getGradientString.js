export default function getGradientString(avgColors) {
    return avgColors.reduce((acc,color,i) => {
      if (i === avgColors.length-1) return acc += `rgb(${color[0]},${color[1]},${color[2]})`
      return acc += `rgb(${color[0]},${color[1]},${color[2]}),`
    },'')
}