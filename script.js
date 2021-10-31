const despertador = new Audio('audio/despertador.mp3')
let clicks = 1
let minutos = 24
let segundos = 59

let minutosDescanso = 4
let segundosDescanso = 59

let minutosDescansoLongo = 14
let segundosDescansoLongo = 59
let cronOn = false

let string
let turnos = 0
let turnosTotal = 0
var cron

let botaoComecar = document.getElementById('botaoPrincipal')
let temporizador = document.getElementById('timer')
const corpo = document.getElementsByClassName('corpo')[0]
const botoes = document.getElementsByClassName('botao-config')
const botaoEngrenagem = document.getElementsByClassName('engrenagem')[0]
const botaoAutoComecar = document.getElementById('autostart')
let clicksBotaoAutostart = 1
const botaoStart = document.getElementsByClassName('botaoStart')[0]
const feedback = document.getElementsByClassName('feedback')[0]


const botaoConfig1 = document.getElementById('pomodoro')
const botaoConfig2 = document.getElementById('descansoCurto')
const botaoConfig3 = document.getElementById('descansoLongo')



function mudarNome() {

    clicks += 1

    if (clicks % 2 != 0) {
        botaoComecar.textContent = 'Começar'
        clearInterval(cron)
        cronOn = false
        feedback.innerHTML = ''

    } else {
        botaoComecar.textContent = 'Parar'

        comecar()
        cronOn = true

        if (corpo.getAttribute("class") == 'corpo') {
            feedback.innerHTML = "Hora do trabalho, mantenha-se focado!"
        } else if (corpo.getAttribute("class") == 'corpo-descanso') {
            feedback.innerHTML = "Hora de uma pequena pausa, vá beber uma água!"
        } else {
            feedback.innerHTML = "Hora de um descanso."
        }
    }
}


function comecar() {
    const tipoDoCorpo = corpo.getAttribute("class")
    if (tipoDoCorpo == 'corpo') {
        cron = setInterval(() => {
            if (minutos >= 10 && segundos >= 10) {
                string = minutos + ':' + segundos
                temporizador.innerHTML = string
            } else if (minutos >= 10 && segundos < 10) {
                string = minutos + ':0' + segundos
                temporizador.innerHTML = string
            } else if (minutos < 10 && segundos >= 10) {
                string = '0' + minutos + ':' + segundos
                temporizador.innerHTML = string
            } else {
                if (minutos == 0 && segundos == 0) {
                    string = '0' + minutos + ':0' + segundos
                    temporizador.innerHTML = string
                    turnos += 1
                    turnosTotal += 1
                    minutos = 25
                    segundos = 0
                    despertador.play()
                    if (turnos % 3 != 0 ) {
                        if (clicksBotaoAutostart % 2 == 0) {
                            mudarCorpo('corpo-descanso')
                            mudarTempo()
                            feedback.innerHTML = "Hora de uma pequena pausa, vá beber uma água!"
                            clearInterval(cron)
                            botaoComecar.textContent = 'Parar'
                            comecar()

                        } else if (clicksBotaoAutostart % 2 != 0) {
                            clearInterval(cron)
                            mudarCorpo('corpo-descanso')
                            feedback.innerHTML = ''
                            clicks -= 1
                            mudarTempo()
                        }
                    } else {
                        if (clicksBotaoAutostart % 2 == 0) {
                            mudarCorpo('corpo-descanso-longo')
                            mudarTempo()
                            clearInterval(cron)
                            botaoComecar.textContent = 'Parar'
                            comecar()
                            feedback.innerHTML = "Hora de um descanso."
                            turnos = 0
                        } else {
                            clearInterval(cron)
                            mudarCorpo('corpo-descanso-longo')
                            cronOn = false
                            mudarTempo()
                            feedback.innerHTML = ''
                            clicks -= 1
                            turnos = 0
                        }
                    }

                } else {
                    string = '0' + minutos + ':0' + segundos
                    temporizador.innerHTML = string
                }
            }

            if (segundos == 0) {
                segundos = 60
                minutos -= 1
            }

            segundos -= 1

        }, 1000)
    } else if (tipoDoCorpo == 'corpo-descanso') {

        cron = setInterval(() => {
            if (segundosDescanso > 10) {
                string = '0' + minutosDescanso + ':' + segundosDescanso
                timer.innerHTML = string
            } else if (segundosDescanso < 10) {
                string = '0' + minutosDescanso + ':0' + segundosDescanso
                timer.innerHTML = string
            }

            if (minutosDescanso == 0 && segundosDescanso == 0) {
                despertador.play()
                if (clicksBotaoAutostart % 2 == 0) {
                    mudarCorpo('corpo')
                    clearInterval(cron)
                    botaoComecar.textContent = 'Parar'
                    comecar()
                    mudarTempo()
                    timer.innerHTML = '05:00'
                    feedback.innerHTML = 'Hora do trabalho, mantenha-se focado!'
                    mudarTempo()
                    minutosDescanso = 4
                    segundosDescanso = 59
                } else {
                    clearInterval(cron)
                    mudarCorpo('corpo')
                    cronOn = false
                    mudarTempo()
                    timer.innerHTML = '05:00'
                    botaoComecar.textContent = 'Começar'
                    feedback.innerHTML = ''
                    mudarTempo()
                    clicks -= 1
                    minutosDescanso = 4
                    segundosDescanso = 59
                }
            }

            if (segundosDescanso == 0) {
                segundosDescanso = 60
                minutosDescanso -= 1
            }

            segundosDescanso -= 1

        }, 1000)
    } else {
        cron = setInterval(() => {
            if (minutosDescansoLongo
                >= 10 && segundosDescansoLongo >= 10) {
                string = minutosDescansoLongo + ':' + segundosDescansoLongo
                temporizador.innerHTML = string
            } else if (minutosDescansoLongo >= 10 && segundosDescansoLongo < 10) {
                string = minutosDescansoLongo + ':0' + segundosDescansoLongo
                temporizador.innerHTML = string
            } else if (minutosDescansoLongo < 10 && segundosDescansoLongo >= 10) {
                string = '0' + minutosDescansoLongo + ':' + segundosDescansoLongo
                temporizador.innerHTML = string
            } else {
                if (minutosDescansoLongo == 0 && segundosDescansoLongo == 0) {
                    if (clicksBotaoAutostart % 2 == 0) {
                        despertador.play()
                        mudarCorpo('corpo')
                        mudarTempo()
                        clearInterval(cron)
                        botaoComecar.textContent = 'Parar'
                        comecar()
                        timer.innerHTML = '15:00'
                        feedback.innerHTML = 'Hora do trabalho, mantenha-se focado!'
                        mudarTempo()
                        minutosDescansoLongo = 14
                        segundosDescansoLongo = 59
                    } else {
                        despertador.play()
                        clearInterval(cron)
                        mudarCorpo('corpo')
                        cronOn = false
                        mudarTempo()
                        timer.innerHTML = '15:00'
                        botaoComecar.textContent = 'Começar'
                        feedback.innerHTML = ''
                        mudarTempo()
                        clicks -= 1
                        minutosDescansoLongo = 14
                        segundosDescansoLongo = 59
                    }
                } else {
                    string = '0' + minutosDescansoLongo + ':0' + segundosDescansoLongo
                    temporizador.innerHTML = string
                }
            }

            if (segundosDescansoLongo == 0) {
                segundosDescansoLongo = 60
                minutosDescansoLongo -= 1
            }
            segundosDescansoLongo -= 1
        }, 1000)
    }
}

const botao = document.getElementById('botaoPrincipal')
botao.addEventListener('click', mudarNome, false)

function mudarCorpo(tipoDeCorpo) {

    minutos = 24
    segundos = 59

    minutosDescanso = 4
    segundosDescanso = 59

    minutosDescansoLongo = 14
    segundosDescansoLongo = 59

    botaoComecar.textContent = 'Começar'

    if (tipoDeCorpo == 'corpo-descanso') {
        corpo.setAttribute('class', 'corpo-descanso')
        botaoEngrenagem.setAttribute('class', 'engrenagem-descanso')
        botaoStart.setAttribute('class', 'botaoStart-descanso')
        botaoConfig1.setAttribute('class', 'botao-config-descanso')
        botaoConfig2.setAttribute('class', 'botao-config-descanso')
        botaoConfig3.setAttribute('class', 'botao-config-descanso')

    } else if (tipoDeCorpo == 'corpo-descanso-longo') {
        corpo.setAttribute('class', 'corpo-descanso-longo')
        botaoEngrenagem.setAttribute('class', 'engrenagem-descanso-longo')
        botaoStart.setAttribute('class', 'botaoStart-descanso-longo')
        botaoConfig1.setAttribute('class', 'botao-config-descanso-longo')
        botaoConfig2.setAttribute('class', 'botao-config-descanso-longo')
        botaoConfig3.setAttribute('class', 'botao-config-descanso-longo')


    } else {
        corpo.setAttribute('class', 'corpo')
        botaoEngrenagem.setAttribute('class', 'engrenagem')
        botaoStart.setAttribute('class', 'botaoStart')
        botaoConfig1.setAttribute('class', 'botao-config')
        botaoConfig2.setAttribute('class', 'botao-config')
        botaoConfig3.setAttribute('class', 'botao-config')


    }
}

function mudarTempo() {
    if (corpo.getAttribute('class') == 'corpo') {
        timer.innerHTML = '25:00'
    } else if (corpo.getAttribute('class') == 'corpo-descanso') {
        timer.innerHTML = '05:00'
    } else {
        timer.innerHTML = '15:00'
    }
}

botaoConfig1.addEventListener('click', function () {
    if (cronOn) {
        var resposta = window.confirm('O temporizador ainda está rodando, se apertar em OK você perderá o progresso atual')
    } if (resposta) {
        mudarCorpo('corpo')
        mudarTempo()
        feedback.innerHTML = ''
        cronOn = false
        clicks -= 1
        turnos = 0
        clearInterval(cron)
    }
    if (!cronOn){
        mudarCorpo('corpo')
        mudarTempo()
    }
}, false)


botaoConfig2.addEventListener('click', function () {
    if (cronOn) {
        var resposta = window.confirm('O temporizador ainda está rodando, se apertar em OK você perderá o progresso atual')
    } if (resposta) {
        mudarCorpo('corpo-descanso')
        mudarTempo()
        feedback.innerHTML = ''
        cronOn = false
        clicks -=1
        turnos = 0
        clearInterval(cron)
    }
    if (!cronOn){
        mudarCorpo('corpo-descanso')
        mudarTempo()
    }
    
}, false)

botaoConfig3.addEventListener('click', function () {
    if (cronOn) {
        var resposta = window.confirm('O temporizador ainda está rodando, se apertar em OK você perderá o progresso atual')
    } if (resposta) {
        mudarCorpo('corpo-descanso-longo')
        mudarTempo()
        feedback.innerHTML = ''
        cronOn = false
        clicks -= 1
        turnos = 0
        clearInterval(cron)
    }
    if (!cronOn){
        mudarCorpo('corpo-descanso-longo')
        mudarTempo()
    }
}, false)

botaoAutoComecar.addEventListener('click', function() {
    clicksBotaoAutostart += 1
    let autostart
    if (clicksBotaoAutostart % 2 == 0) {
        autostart = true
        botaoEngrenagem.innerHTML = 'Desativar autostart'
    } else {
        autostart = false
        botaoEngrenagem.innerHTML = 'Autostart'
    }
    
}, false)
