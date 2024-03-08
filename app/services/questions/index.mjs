export function computeMaxScore (questions) {
  let score = 0

  for (let question in questions) {
    score += (questions[question].options.length - 1)
  }

  return score
}
