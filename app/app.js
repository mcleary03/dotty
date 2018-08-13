const setDifficulty = require('./scripts/setDifficulty')
const getDimensions = require('./scripts/getDimensions')

let difficulty = setDifficulty()

console.log(difficulty)

setDifficulty(difficulty)

setTimeout(()=>console.log(difficulty), 1000)