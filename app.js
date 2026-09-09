const weddingDate = new Date('2026-11-01T00:00:00+08:00')
const daysCount = document.querySelector('#days-count')

function updateCountdown() {
  const days = Math.max(0, Math.ceil((weddingDate.getTime() - Date.now()) / 86400000))
  daysCount.textContent = String(days)
}
updateCountdown()
setInterval(updateCountdown, 60_000)

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const reveals = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  reveals.forEach((el) => observer.observe(el))
} else {
  reveals.forEach((el) => el.classList.add('is-visible'))
}

const music = document.querySelector('#wedding-music')
const musicButton = document.querySelector('#music-toggle')
let musicPlaying = false

function setMusicState(playing) {
  musicPlaying = playing
  musicButton.classList.toggle('playing', playing)
  musicButton.setAttribute('aria-pressed', String(playing))
  musicButton.setAttribute('aria-label', playing ? '暂停背景音乐' : '播放背景音乐')
}

musicButton.addEventListener('click', async () => {
  try {
    if (musicPlaying) {
      music.pause()
      setMusicState(false)
    } else {
      music.volume = 0.22
      await music.play()
      setMusicState(true)
    }
  } catch {
    setMusicState(false)
  }
})

music.addEventListener('pause', () => setMusicState(false))
music.addEventListener('play', () => setMusicState(true))
