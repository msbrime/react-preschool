import firebase from "services/firebase";

const nodeReference = 'questions';

export function load(callback){
    let questionsRef = firebase().database().ref(nodeReference);
    questionsRef.once('value',snapshot => {
        let 
            normalizedData = normalize(snapshot.val()),
            maxScore = computeMaxScore(snapshot.val());

        callback({
            questions: normalizedData,
            ids: Object.keys(normalizedData),
            maxScore
        });
    });
}

function normalize(questions){
    let normalized = {};
    
    questions.forEach(question => {
        normalized[question.id] = question;
    })

    return normalized;
}

function computeMaxScore(questions){
    return questions.reduce((acc, question) => {
        return acc + (question.options.length - 1);
    }, 0);
}