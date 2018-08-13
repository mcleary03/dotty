const options = {
	casual: {
    text: 'CASUAL',
    interval: 3000,
    multiplier: 1
  },
  normal: {
    text: 'NORMAL',
    interval: 2000,
    multiplier: 1.5
  },
  endurance: {
    text: 'ENDURANCE',
    interval: 2000,
    multiplier: 1.5
  }
}
module.exports = currDiff => {
  console.log('curDiff', currDiff)
  const { casual, normal, endurance } = options
  if (!currDiff) return casual
  const { text } = currDiff
  console.log('text', text==='CASUAL')
  console.log(normal)
  return text==='CASUAL' ? normal : text==='NORMAL' ? endurance : casual
}