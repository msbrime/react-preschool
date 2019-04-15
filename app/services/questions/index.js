import firebase from "services/firebase";

const nodeReference = 'questions';

export function load(callback){
    let questionsRef = firebase().database().ref(nodeReference);
    questionsRef.once('value',snapshot => {
        let 
            normalizedData = snapshot.val(),
            maxScore = computeMaxScore(snapshot.val());

        callback({
            questions: normalizedData,
            ids: Object.keys(normalizedData),
            maxScore
        });
    });
}

export function create(question){
    let 
        questionsRef = firebase().database().ref(nodeReference),
        newQuestionRef = questionsRef.push();
    
    question.id = newQuestionRef.key;
    return newQuestionRef.set(question);
}


function normalize(questions){
    let normalized = {};
    
    questions.forEach(question => {
        normalized[question.id] = question;
    })

    return normalized;
}

function computeMaxScore(questions){
    let score = 0;

    for(let question in questions){
        score += (questions[question].options.length - 1)
    }
    
    return score;
}