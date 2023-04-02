import { read } from 'services/firebase';

export function load (callback) {
  read("questions", questions => {
    callback({
      questions,
      ids: Object.keys(questions),
      maxScore: computeMaxScore(questions)
    })
  })
}

// export function create (question) {
//   let
//     questionsRef = firebase().database().ref(nodeReference)
//   let newQuestionRef = questionsRef.push()

//   question.id = newQuestionRef.key
//   return newQuestionRef.set(question)
// }

function computeMaxScore (questions) {
  let score = 0

  for (let question in questions) {
    score += (questions[question].options.length - 1)
  }

  return score
}
