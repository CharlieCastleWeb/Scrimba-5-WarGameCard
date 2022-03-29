
let deckId 
let computerScore = 0
let playerScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const winnerContainer = document.getElementById("winner")
const remainingCardsContainer = document.getElementById("remaining-cards")
const computerScoreDisplay = document.getElementById("computer-score")
const playerScoreDisplay = document.getElementById("player-score")

async function handleClick() {
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await (response.json())
    deckId = data.deck_id
    remainingCardsContainer.innerHTML = `There are ${data.remaining} remaining` 
}


newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", async () => {
    const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await response.json()    
    remainingCardsContainer.innerHTML = `There are ${data.remaining} remaining`  
    cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
    `
    cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
    `
    winnerContainer.innerHTML = determineCardWinner(data.cards[0], data.cards[1])
    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        if (computerScore > playerScore) {
            winnerContainer.innerHTML = `The computer is the final winner!`
        } else if (computerScore < playerScore) {
            winnerContainer.innerHTML = `You are the final winner!`
        } else {
            winnerContainer.innerHTML = `It's a tie!`
        }
    }
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    let message

    if(card1ValueIndex > card2ValueIndex) {
        message = "Computer wins!"
        computerScore++
        computerScoreDisplay.innerHTML = `Computer score: ${computerScore}`
    }
    else if(card1ValueIndex < card2ValueIndex) {
        message = "You win!"
        playerScore++
        playerScoreDisplay.innerHTML = `My score: ${playerScore}`
    }
    else message = "It's war!"
    return `
        <p>${message}</p>
    `
}