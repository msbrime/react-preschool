let animations = [
    'zoomIn','flipInY',
    'fadeIn','bounceIn',
    'flipInX','lightSpeedIn'
];  

export function getRandomIndex(elementArray){
    return Math.floor(Math.random()*elementArray.length);
}

export function contains(array,element){
    return (array.indexOf(element) >= 0)
}

export {animations};