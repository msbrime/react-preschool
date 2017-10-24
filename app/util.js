const 
    animations = [
        'zoomIn','flipInY',
        'fadeIn','bounceIn',
        'flipInX','lightSpeedIn'
    ],
    narrations = {
        wrong : "Oh no! You got this one wrong",
        right : "That's Right!"
    };
    
export function getRandomIndex(elementArray){
    return Math.floor(Math.random()*elementArray.length);
}

export function contains(array,element){
    return (array.indexOf(element) >= 0)
}

/**
 *
 * @param {array} questions
 * @returns {unresolved}
 */
export function getMaxScore(questions) {

    return questions.reduce((acc, question) => {
        return acc + (question.options.length - 1);
    }, 0);

}

export {animations,narrations};