'use client'

import JSConfetti from 'js-confetti'

let confetti: JSConfetti | null = null

const getConfetti = () => {
  if (!confetti) confetti = new JSConfetti()
  return confetti
}

// Because I'm the GOAT. Obviously.
export const releaseTheGoats = () => {
  getConfetti().addConfetti({ emojis: ['🐐'], emojiSize: 60, confettiNumber: 90 })
}

export const popConfetti = (canvas?: HTMLCanvasElement | null) => {
  const instance = canvas ? new JSConfetti({ canvas }) : getConfetti()
  instance.addConfetti({
    confettiRadius: 5,
    confettiNumber: 60,
    confettiColors: ['#FFFFFF', '#E9DB4E', '#809FCA', '#D58799', '#3DDC84']
  })
}
