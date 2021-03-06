// build DOM elements
const body = d3.select('body')
const main = body.append('div').attr('id', 'main')
const ui = main.append('div').attr('id', 'ui')
const diffBtn = ui.append('button').attr('id', 'difficulty')
const playBtn = ui.append('button').attr('id', 'play').text('PLAY')
const hiScoreDisplay = ui.append('p').attr('id', 'hiScore')
const scoreDisplay = ui.append('p').attr('id', 'score')
const svg = main.append('svg').attr('id', 'svg')
const footer = main.append('div').attr('id', 'footer')
const message = body.append('div').attr('class', 'message').classed('hidden', true)
let logo

const coin = 'BTC'
const dataLimit = 119
// array of values based on minute by minute trades, takes symbol and limit args
const asyncData = getHistData(coin, dataLimit)

// boundaries
const wOffset = 0.05 * window.innerWidth
const hOffset = (window.innerWidth>650||window.innerHeight>400 ? 0.10 : 0.15) * window.innerHeight
const svgBounds = document.querySelector('#svg').getBoundingClientRect()
const w = svgBounds.width
const h = svgBounds.height
const wMin = wOffset
const wMax = w - wOffset
const hMin = hOffset
const hMax = h - 0.05 * window.innerHeight

const endCount = 10 // winning # of circles tapped (N/A in Endurance and Crypto modes)
let count = 0
let levels = {
  casual: {
    name: 'CASUAL',
    interval: 3000,
    multiplier: 1,
    instructions: 'Slow interval, more points for quick taps, 10 dots'
  },
  normal: {
    name: 'NORMAL',
    interval: 1500,
    multiplier: 1.5,
    instructions: 'Faster interval, more points, 10 dots'
  },
  endurance: {
    name: 'ENDURANCE',
    interval: 1500,
    multiplier: 1.5,
    instructions: 'Infinite dots, go for high score'
  },
  crypto: {
    name: 'CRYPTO',
    interval: 1500,
    instructions: 'Dot size based on Bitcoin transactions over the past 2 hours. Color based on value increase/decrease.  Green adds points, Red subtracts them.  You have 1 minute'
  }
}


let difficulty = levels.casual
diffBtn.text(difficulty.name)


let getHiScore = () => window.localStorage.getItem(`${difficulty.name}HiScore`) || 0
let setHiScore = score => window.localStorage.setItem(`${difficulty.name}HiScore`, score)
let score = 0
let oldHiScore = getHiScore()
let playing = false
let timer
const allTimeouts = []

// ALL intervals should be done using timed() to allow intervals to later be cancelled
const timed = (cb, ms) => allTimeouts.push(setTimeout(cb,ms))

const clearAllTimers = () => allTimeouts.forEach( circle => clearTimeout(circle) )


const updateScore = amount => {
  score = playing ? score + Math.round(amount) : 0
  if (score > getHiScore()) setHiScore(score)
  scoreDisplay.text(`SCORE: ${score}`)
  hiScoreDisplay.text(`HIGH SCORE: ${getHiScore()}`)
}


const hideMessage = () => message.classed('hidden', true)


const showMessage = (string, className='') => {
  message.html('')
  string.split(' ').forEach(word => message.append('span').text(word).classed('word', true))
  message.classed(`hidden fadeInOut`, false)
  message.classed(`${className}`, true)
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


const renderCircle = ({ r, cx, cy, color, className }=randomCircle(), interval=1000) => {
  const circ = svg.append('circle')
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


const removeCircle = circ => {
  if (playing) {
    const { interval, multiplier } = difficulty

    clearTimeout(circ.attr('gameOver')) // remove this circle's gameOver timer
    count++ // increment number of circles touched
    // points determined by amount of time on screen before touching the circle
    const points = interval - (new Date() - new Date(circ.attr('birth'))) 
    updateScore(points * multiplier)
    // ignore count if Endurance mode
    if (difficulty.name !== 'endurance' && count >= endCount) endGame()
  }

  circ.on('click', null).attr('pointer-events', 'none').transition().attr('r', 0).duration(1000).remove()
}

const chaChing = circ => {
  if (playing) {
    const val = circ.attr('value')
    updateScore(val)
  }
  circ.on('click', null).attr('pointer-events', 'none').transition().attr('r', 0).duration(1000).remove()
}


const runCountdown = (time = 950) => {
  showMessage(             '3')
  timed( () => showMessage('2'),  time )
  timed( () => showMessage('1'),  time*2 )
  timed( () => showMessage('GO'), time*3 )
  timed(       hideMessage,       time*3 + 300 )
}


const reset = () => {
  const allCircs = d3.selectAll('circle').remove()
  showMessage('')
  message.classed('instructions', false)
  clearAllTimers()
  logo.remove()
  timeouts = []
  count = 0
  score = 0
  oldHiScore = getHiScore()
  updateScore(0)
}


const startGame = difficulty => {
  const { name, interval } = difficulty
  const crypto = name==='CRYPTO'
  reset()
  playing = true
  playBtn.text('END')
  runCountdown()
  
  svg.on('click', e => {
    if (d3.select(d3.event.target).attr('r')) {
      let circ = d3.select(d3.event.target)
      crypto ? chaChing(circ) : removeCircle(circ)
    }
  })

  crypto ? cryptoTradeMode() : setTimeout( () => timer = setInterval( () => renderCircle(), interval) , 3150 - interval )
}

const getRadius = (n, max) => {
  if (n<max/4) return 25
  if (n<max/2) return 50
  if (n<max)   return 100
  return 150
}

const cryptoTradeMode = () => {
  timed( () => {
    asyncData
      .then( data => {
        data.forEach( (d, i) => {
          timed( () => {
            const circ = svg.append('circle')
            .attr('cursor', 'pointer')
            .attr('r', 0) // start radius
            .attr('cx', `${rand(wMin,wMax)}`)
            .attr('cy', `${rand(hMin, hMax)}`)
            .attr('value', d)
            .attr('fill', `${d < 0 ? '#d81c2f' : '#1cd81c'}`)
            .transition()
            .attr('r', getRadius(Math.abs(d), 100)) // ending radius 10% of width or height (biggest)
            .duration(difficulty.interval) // ms on screen
            .ease(d3.easeBounce)
            .remove()
          }, i*500 )
        })
      })
  }, 3000)

  timed( () => endGame(), 62000)
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

  if (['ENDURANCE', 'CRYPTO'].includes(difficulty.name)) {
    if (score>oldHiScore) {
      spiralDots()
      showMessage(`NEW HIGH SCORE ${hiScore}`)
    } else {
      lotsOfDots()
      showMessage(`YOUR SCORE ${score}`)
    }
  } else {
    win ? spiralDots() : lotsOfDots()
    showMessage(score>oldHiScore ? `NEW HIGH SCORE! ${hiScore}` : `YOU ${ win ? 'WIN' : 'LOSE' }!`)
  }
}


const handlePlayBtn = () => playing ? endGame() : startGame(difficulty)


const changeDifficulty = ( currDifficulty, levels ) => {
  const names = Object.keys(levels)
  const idx = names.indexOf(currDifficulty.name.toLowerCase()) + 1
  const level = names[ idx % names.length ]
  difficulty = levels[level]
  diffBtn.text(difficulty.name)

  playing ? endGame() : updateScore(0)
  reset()
  showMessage(difficulty.instructions, 'instructions')
}


const lotsOfDots = () => {
  for (let i = 200; i > 0; i--) {
    timed( () => {
      const { r, cx, cy, color, className } = randomCircle()
      const circ = svg.append('circle')
      circ
        .on('click', () => removeCircle(circ))
        .attr('cursor', 'pointer')
        .attr('r', `${r}`).attr('cx', `${cx}`).attr('cy', `${cy}`)
        .attr('fill', `${color}`)
        .transition()
        .attr('r', rand( 0.01*Math.max(w,h), 0.15*Math.max(w,h)))
        .duration(400 + i * 2) // on-screen circle speed ( goes from 398 to 0)
    }, i * (i * 0.02) ) // interval between new circles ( goes from 2 to 200 )
  }
}


const spiralDots = (n = 360, spread = 10) => {
  let cx = w / 2
  let cy = h / 2

  for (let i=0; i<=n; i++) {
      timed(() => {
      angle = 0.3 * i;
      x = cx + (1 + spread * angle) * Math.cos(angle);
      y = cy + (1 + spread * angle) * Math.sin(angle);

      const r = 0 // starting radius
      const rEnd = n/(w>650||h>400?1:2) - i/(w>650||h>400?1:2)
      color = randColor()

      const circ = svg.append('circle')
      circ
        .on('click', () => removeCircle(circ))
        .attr('cursor', 'pointer')
        .attr('r', `${r}`).attr('cx', `${x}`).attr('cy', `${y}`)
        .attr('fill', `${color}`)
        .transition()
        .attr('r', rEnd) // ending radius
        .duration(3600 - i * 10) // on-screen circle speed
        .ease(d3.easeBounce)
    }, i*6) // interval between new circles
  }
}


const showAnimatedLogoAndPrompt = context => {
  const startPrompt = str => {
    showMessage(str)
    message.classed('fadeInOut', true)
  }

  logo = context.append('g')
    .attr('transform', `translate(${w/2} ${h/2}) scale(0)`)

  logoBG = logo.append('circle')
    .attr('r', '100px')
    .attr('fill', '#AF0055')
    
  const logoText = logo.append('text')
    .text('e')
    .attr('x', -100)
    .attr('y', 93)
    .attr('id', 'logo')
    .attr('fill', '#fff')

  logo
    .transition() // grow full size center screen
    .attr('transform', `translate(${w/2} ${h/2}) scale(1)`)
    .duration(1300)
    .ease(d3.easeBounce)
    .delay(0)
    .transition() // leave screen left
    .attr('transform', `translate(${-w*2} ${h/2})`)
    .duration(2000)
    .ease(d3.easeExp)
    .on('end', () => startPrompt('Tap PLAY')) // then display 'press start' message
    .remove()

  logoText
    .transition() // after 1 second, slide right and turn pink
    .attr('x', 90)
    .attr('fill', '#AF0055')
    .duration(1500)
    .delay(1000)
}


const init = () => {
  updateScore(0)
  showAnimatedLogoAndPrompt(svg)
  playBtn.on('click', handlePlayBtn)
  diffBtn.on('click', () => changeDifficulty(difficulty, levels))
}


init()