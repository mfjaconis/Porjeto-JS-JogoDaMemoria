const grid = document.querySelector('.grid')
const spanJogador = document.querySelector('.jogador')
const tempo = document.querySelector('.tempo')

const personagens = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if(disabledCards.length === 20 ) {
        clearInterval(this.loop)
        alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi: ${tempo.innerHTML}`)

    }
}

const checkCards = () => {
    const primeiroPersonagem = firstCard.getAttribute('data-personagem')
    const segundoPersonagem = secondCard.getAttribute('data-personagem')

    if (primeiroPersonagem === segundoPersonagem) {

        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEndGame()

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 500)
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards();
    }
}

const loadGame = () => {

    const duplicandoPersonagens = [...personagens, ...personagens]

        const embaralharArray = duplicandoPersonagens.sort(() => Math.random() - 0.5)

        embaralharArray.forEach((personagem) =>{
        const card = createCard(personagem)
        grid.appendChild(card)
    });
}

const createCard = (personagem) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../img/${personagem}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-personagem', personagem)

    return card
}

const inicioTempo = () => {

   this.loop =  setInterval(()=> {
        const tempoAtual = Number(tempo.innerHTML)
        tempo.innerHTML = tempoAtual + 1 

    }, 1000)
}

window.onload = () => {
    spanJogador.innerHTML = localStorage.getItem('jogador')
    inicioTempo()
    loadGame()
}



