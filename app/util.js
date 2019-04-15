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

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export {animations,narrations};