const fs = require('fs')

const words = fs.readFileSync('/usr/share/dict/words')
  .toString()
  .toLowerCase()
  .split('\n')

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

let lookup =
  alphabet.reduce((obj, letter) => {
    obj[letter] = alphabet.reduce((obj, letter) => {
      obj[letter] = {}
      return obj
    }, {})
    return obj
  }, {})

words.forEach(function insert (word) {
  if (word.length < 2) return
  const first = word[0]
  const number = word.length - 2
  const last = word[word.length - 1]
  if (lookup[first][last][number]) {
    lookup[first][last][number].push(word)
  } else {
    lookup[first][last][number] = [ word ]
  }
})

function sample (coll) {
  return coll[~~(Math.random() * coll.length)]
}

function splitToParts (word) {
  const lastIndex = word.length - 1
  const first = word[0]
  const middle = word.substring(1, lastIndex)
  const last = word[lastIndex]
  return [first, middle, last]
}

function numeronymize (word) {
  return splitToParts(word).join('')
}

function denumeronymize (numeronym) {
  const [ first, middle, last ] = splitToParts(numeronym)
  const number = middle.length
  return lookup[first][last][number]
}


function telephone (word) {
  return sample(denumeronymize(numeronymize(word)))
}

console.log(telephone('iphone'))

