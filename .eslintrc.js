module.exports = {
    "settings": {
      "react": {
        "createClass": "createReactClass", 
        "pragma": "React",  
        "version": "detect",
        "flowVersion": "0.53"
     }
  },
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
      'standard',
      "plugin:react/recommended"
    ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    FIREBASE_API_KEY: true,
    FIREBASE_AUTH_DOMAIN: true,
    FIREBASE_DATABASE_URL: true,
    FIREBASE_PROJECT_ID: true,
    FIREBASE_STORAGE_BUCKET: true,
    FIREBASE_MESSAGE_SENDER_ID: true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'standard/no-callback-literal': false,
    'react/prop-types': 0
  },
}
