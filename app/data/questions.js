let questions = [
    {
        id: 1,
        question: 'What fruit is this?',
        resource: {
            type: 'image',
            url: 'build/images/apple.png'
        },
        options: ['apple', 'peach', 'pear', 'orange'],
        answer: 'apple'
    },
    {
        id: 2,
        question: 'What shape is this?',
        resource: {
            type: 'image',
            url: 'build/images/square.png'
        },
        options: ['square', 'triangle', 'circle', 'rectangle'],
        answer: 'square'
    },
    {
        id: 3,
        question: 'Is this a letter or number?',
        resource: {
            type: 'image',
            url: 'build/images/three.png'
        },
        options: ['letter', 'number'],
        answer: 'number'
    },
    {
        id: 4,
        question: 'How many letters are in the alphabet?',
        resource: {
            type: 'image',
            url: 'build/images/alphabet.png'
        },
        options: ['10', '12', '18', '26'],
        answer: '26'
    },
    {
        id: 5,
        question: 'What Shape is this?',
        resource: {
            type: 'image',
            url: 'build/images/triangle.png'
        },
        options: ['square', 'triangle', 'rectangle', 'circle'],
        answer: 'triangle'
    }
];

export { questions };