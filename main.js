const readline = require("node:readline/promises")
const { stadin: input, stdout: output} = require("node:process")

function main() {
  const wordsBank = ["ARANDANOS"]
  const randomIndex = parseInt(Math.random() * wordsBank.length) 
  const randomWord = wordsBank[randomIndex]

  const loopGame = true

  while (loopGame) {
    

  }


}


function readline() {
  const rl = readline.createInterface({input, outpur})
}

main()