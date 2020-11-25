module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'impliedStrict': true,
    },
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
  ],
  "parser": "esprima",
  'rules': {
  },
};
