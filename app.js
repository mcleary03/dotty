const body = d3.select('body')
const main = body.append('div').attr('id', 'main')
const ui = main.append('div').attr('id', 'ui')
const diffBtn = ui.append('button').attr('id', 'difficulty')
const playBtn = ui.append('button').attr('id', 'play').text('PLAY')
const hiScoreDisplay = ui.append('p').attr('id', 'hiScore')
const scoreDisplay = ui.append('p').attr('id', 'score')
const svg = main.append('svg').attr('id', 'svg')
const message = body.append('div').attr('id', 'message').classed('hidden', true)
// animation origin boundaries
const wMin = 0.05 * window.innerWidth
const wMax = window.innerWidth - wMin
const hMin = 0.11 * window.innerHeight
const hMax = window.innerHeight - 0.06 * window.innerHeight
// counters and flags
const endCount = 10 // winning # of circles = () clicked (N/A in Endurance mode)
let count = 0
let hiScore = window.sessionStorage.getItem('hiScore') || 0
let score = 0
let playing = false
let timer
const allTimeouts = [] // timeouts

let clearAllTimers = () => allTimeouts.forEach( circle => clearTimeout(circle) )

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

const updateScore = amount => {
  if (playing) {
    score += Math.round(amount)
  } else if (score > hiScore) {
    window.sessionStorage.setItem('hiScore', score)
    hiScore = score
  }
  scoreDisplay.text(`SCORE: ${score}`)
  hiScoreDisplay.text(`HIGH SCORE: ${hiScore}`)
}
updateScore(0)

const hideMessage = () => message.classed('hidden', true)

const showMessage = string => {
  message.html('') // clear prev message
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

// data === deltas from 'cryptoAPI.js'
const dataCircle = data => {
  const d = Math.abs(data)
  const gain = data >= 0
  console.log(d)
  return {
    r: d,
    cx: rand(wMin, wMax),
    cy: rand(hMin, hMax),
    color: gain ? 'green' : 'red'
  }
}

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
    .attr('r', 800) // ending radius
    .duration(3000) // ms on screen
    .ease(d3.easeBounce)
}

const renderCircles = (data, interval=1000) => {
  data.forEach( (d, i) => {
    timeouts.push( setTimeout( () => renderCircle( dataCircle(d), interval ), interval-i*1000) )
  })
}

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
  timeouts = []
  count = 0
  score = 0
  updateScore(0)
}

const startGame = difficulty => {
  reset()
  playing = true
  playBtn.text('END')
  runCountdown()
  renderCircles(deltas, difficulty.interval)
}

const endGame = () => {
  const win = count >= endCount
  playing = false
  playBtn.text('PLAY')
  clearInterval(timer)
  clearAllTimers() // clear timeouts to stop all queued animations
  d3.selectAll('circle').remove()
  updateScore(0)

  if (difficulty !== levels.endurance) {
    win ? spiralDots() : lotsOfDots()
    showMessage(`YOU ${ win ? 'WIN' : 'LOSE' }!`)
    if (win && score>hiScore) message.text(`${message.text()} NEW HIGH SCORE ${hiScore}`)
  } else {
    showMessage(score>hiScore ? `NEW HIGH SCORE ${hiScore}` : `YOUR SCORE ${score}`)
  }
}

const handlePlayBtn = () => playing ? endGame() : startGame(difficulty)

const changeDifficulty = ( { text }, { casual, normal, endurance } ) => {
  difficulty = text==='CASUAL' ? normal : text==='NORMAL' ? endurance : casual
  diffBtn.text(difficulty.text)
  if (playing) endGame()
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
        .attr('r', rand(20, 300))
        .duration(400 + i * 2) // on-screen circle speed ( goes from 0 to 398)
    }, i * (i * 0.02) )) // interval between new circles = () ( goes from 200 to 2 )
  }
}

const spiralDots = (n = 360, spread = 10) => {
  let cx = window.innerWidth / 2
  let cy = window.innerHeight / 2

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

class Circ {
  constructor(context, r, cx, cy, color, lifetime=3000, ease=d3.easeBounce ) {
    this.context = context
    this.r = r
    this.cx = cx
    this.cy = cy
    this.color = color
    this.lifetime = lifetime
    this.ease = ease
    this.svg
  }

  render() {
    const { context, r, cx, cy, color, lifetime, ease } = this
    this.svg = context.append('circle')
    this.svg
    .on('click', () => removeCircle(svg))
    .attr('gameOver', setTimeout(() => endGame(), lifetime))
    .attr('birth', new Date())
    .attr('cursor', 'pointer')
    .attr('r', `${r}`).attr('cx', `${cx}`).attr('cy', `${cy}`) // starting radius and position
    .attr('fill', `${color}`)
    .transition()
    .attr('r', 800) // ending radius
    .duration(3000) // ms on screen
    .ease(ease)
  }
}

// const a = new Circ(svg, 30, 300, 300, 'blue')
// a.render()