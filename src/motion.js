export const MOTION = {
  ease: {
    cinematic: 'power4.out',
    reveal: 'power3.out',
    smooth: 'power3.inOut',
    linear: 'none',
  },
  duration: {
    micro: 0.25,
    reveal: 0.8,
    entrance: 1.1,
    cinematic: 1.8,
  },
  scrub: {
    standard: 1,
  },
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const createRafLoop = (callback) => {
  let frame
  const tick = (time) => {
    callback(time)
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
