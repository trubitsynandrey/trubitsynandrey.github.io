export const sendGoal = (name: string, params?: unknown) => {
  setTimeout(() => {
    window.ym(94223353, 'reachGoal', name, params)
  }, 2000)
}
