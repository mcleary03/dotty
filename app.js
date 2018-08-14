const body = d3.select('body')
const main = body.append('div').attr('id', 'main')
const ui = main.append('div').attr('id', 'ui')
const diffBtn = ui.append('button').attr('id', 'difficulty')
const playBtn = ui.append('button').attr('id', 'play').text('PLAY')
const hiScoreDisplay = ui.append('p').attr('id', 'hiScore')
const scoreDisplay = ui.append('p').attr('id', 'score')
const svg = main.append('svg').attr('id', 'svg')
const footer = main.append('div').attr('id', 'footer')
const message = body.append('div').attr('id', 'message').classed('hidden', true)
// animation origin boundaries
// const wMin = 0.05 * window.innerWidth
// const wMax = window.innerWidth - wMin
// const hMin = (window.innerWidth>460 ? 0.11 : 16) * window.innerHeight
// const hMax = window.innerHeight - 0.06 * window.innerHeight
const svgBounds = document.querySelector('#svg').getBoundingClientRect()
const w = svgBounds.width
const h = svgBounds.height
const wMin = 0.05*w
const wMax = w-wMin
const hMin = 0.06*h
const hMax = h-0.06*h


// counters and flags
const endCount = 10 // winning # of circles = () clicked (N/A in Endurance mode)
let count = 0
let levels = {
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

let difficulty = levels.casual
diffBtn.text(difficulty.text)

let getHiScore = () => window.localStorage.getItem(`${difficulty.text}HiScore`) || 0
let setHiScore = score => window.localStorage.setItem(`${difficulty.text}HiScore`, score)
let score = 0
let oldHiScore = getHiScore()
let playing = false
let timer
const allTimeouts = []

let clearAllTimers = () => allTimeouts.forEach( circle => clearTimeout(circle) )

const updateScore = amount => {
  score = playing ? score + Math.round(amount) : 0
  if (score > getHiScore()) setHiScore(score)
  scoreDisplay.text(`SCORE: ${score}`)
  hiScoreDisplay.text(`HIGH SCORE: ${getHiScore()}`)
}
updateScore(0)

const hideMessage = () => message.classed('hidden', true)

const showMessage = string => {
  message.html('')
  string.split(' ').forEach(word => message.append('span').text(word).classed('word', true))
  message.classed('hidden', false)
}

const rand = (min = 0, max = 100) => Math.floor(Math.random() * (max - min)) + min // max not inclusive

const randColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  return `#${hex[rand(0,16)]}${hex[rand(0,16)]}${hex[rand(0,16)]}${hex[rand(0,16)]}${hex[rand(0,16)]}${hex[rand(0,16)]}`
}

const randomCircle = (rMin = 10, rMax = 20) => ({
  r: rand(rMin, rMax),
  cx: rand(wMin, wMax),
  cy: rand(hMin, hMax),
  color: randColor()
})

// // data === deltas from 'cryptoAPI.js'
// const dataCircle = data => {
//   const d = Math.abs(data)
//   const gain = data >= 0
//   console.log(d)
//   return {
//     r: d,
//     cx: rand(wMin, wMax),
//     cy: rand(hMin, hMax),
//     color: gain ? 'green' : 'red'
//   }
// }

const renderCircle = (circObj=randomCircle(), interval=1000) => {
  const { r, cx, cy, color, className } = circObj
  const circ = svg.append('circle')
  circ
    .on('click', () => removeCircle(circ))
    .attr('gameOver', setTimeout(() => endGame(), interval))
    .attr('birth', new Date())
    .attr('cursor', 'pointer')
    .attr('r', `${r}`).attr('cx', `${cx}`).attr('cy', `${cy}`) // starting radius and position
    .attr('fill', `${color}`)
    .transition()
    .attr('r', 0.2*Math.max(w,h)) // ending radius 10% of width or height (biggest)
    .duration(3000) // ms on screen
    .ease(d3.easeBounce)
}

// const renderCircles = (data, interval=1000) => {
//   data.forEach( (d, i) => {
//     timeouts.push( setTimeout( () => renderCircle( dataCircle(d), interval ), interval-i*1000) )
//   })
// }

const removeCircle = circ => {
  if (playing) {
    const {
      interval,
      multiplier
    } = difficulty
    clearTimeout(circ.attr('gameOver')) // remove this circle's gameOver timer
    count++ // increment number of circles = () touched
    const points = interval - (new Date() - new Date(circ.attr('birth'))) // points determined by amount of time on screen before touching the circle
    console.log('count: ', count, 'score: ', new Date() - new Date(circ.attr('birth')) / 100)
    console.log('points: ' + points)
    updateScore(points * multiplier)
    if (difficulty !== levels.endurance && count >= endCount) endGame() // ignore count if Endurance mode
  }
  circ.on('click', null).attr('pointer-events', 'none').transition().attr('r', 0).duration(1000).remove()
}

const runCountdown = (time = 950) => {
  showMessage(                  '3')
  setTimeout( () => showMessage('2'),  time )
  setTimeout( () => showMessage('1'),  time*2 )
  setTimeout( () => showMessage('GO'), time*3 )
  setTimeout(       hideMessage,       time*3 + 300 )
}

const reset = () => {
  d3.selectAll('circle').remove()
  showMessage('')
  timeouts = []
  count = 0
  score = 0
  oldHiScore = getHiScore()
  updateScore(0)
}

const startGame = difficulty => {
  reset()
  playing = true
  playBtn.text('END')
  runCountdown()
  // renderCircles(deltas, difficulty.interval)
  timer = setInterval( () => renderCircle(), 3150 )
}

const endGame = () => {
  const win = count >= endCount
  const hiScore = getHiScore()
  updateScore(0)
  playing = false
  playBtn.text('PLAY')
  clearInterval(timer)
  clearAllTimers() // clear timeouts to stop all queued animations
  d3.selectAll('circle').remove()

  if (difficulty !== levels.endurance) {
    win ? spiralDots() : lotsOfDots()
    showMessage(score>oldHiScore ? `NEW HIGH SCORE! ${hiScore}` : `YOU ${ win ? 'WIN' : 'LOSE' }!`)
  } 
  else { // if Endurance mode
    if (score>oldHiScore) {
      spiralDots() // TODO change ending animations for ENDURANCE mode
      showMessage(`NEW HIGH SCORE ${hiScore}`)
    } else {
      lotsOfDots()
      showMessage(`YOUR SCORE ${score}`)
    }
  }
}

const handlePlayBtn = () => playing ? endGame() : startGame(difficulty)

const changeDifficulty = ( { text }, { casual, normal, endurance } ) => {
  difficulty = text==='CASUAL' ? normal : text==='NORMAL' ? endurance : casual
  diffBtn.text(difficulty.text)
  playing ? endGame() : updateScore(0)
  reset()
}

playBtn.on('click', () => handlePlayBtn())
diffBtn.on('click', () => changeDifficulty(difficulty, levels))

const lotsOfDots = () => {
  for (let i = 200; i > 0; i--) {
    allTimeouts.push(setTimeout( () => {
      const { r, cx, cy, color, className } = randomCircle()
      const circ = svg.append('circle')
      circ
        .on('click', () => removeCircle(circ))
        .attr('cursor', 'pointer')
        .attr('r', `${r}`).attr('cx', `${cx}`).attr('cy', `${cy}`)
        .attr('fill', `${color}`)
        .transition()
        .attr('r', rand(20, 0.22*Math.max(w,h)))
        .duration(400 + i * 2) // on-screen circle speed ( goes from 0 to 398)
    }, i * (i * 0.02) )) // interval between new circles = () ( goes from 200 to 2 )
  }
}

const spiralDots = (n = 360, spread = 10) => {
  let cx = w / 2
  let cy = h / 2

  for (let i=0; i<=n; i++) {
      allTimeouts.push(setTimeout(() => {
      angle = 0.3 * i;
      x = cx + (1 + spread * angle) * Math.cos(angle);
      y = cy + (1 + spread * angle) * Math.sin(angle);

      const r = 0 // starting radius
      color = randColor()

      const circ = svg.append('circle')
      circ
        .on('click', () => removeCircle(circ))
        .attr('cursor', 'pointer')
        .attr('r', `${r}`).attr('cx', `${x}`).attr('cy', `${y}`)
        .attr('fill', `${color}`)
        .transition()
        .attr('r', n - i) // ending radius
        .duration(3600 - i * 10) // on-screen circle speed
        .ease(d3.easeBounce)
    }, i*6)) // interval between new circles = ()
  }
}
