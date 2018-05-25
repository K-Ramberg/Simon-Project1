//the base state of new Game
const foundation = {
    difficulty: 'easy',
    computerArray: [],
    playerArray: [],
    isMatch: true,
    insaneMode: false,
    insaneLength: 0,
    bestScore: 0,
    currentTimeSet: function () {
        if (this.difficulty === 'easy') {
            return 1000
        }
        if (this.difficulty === 'medium') {
            return 500
        }
        if (this.difficulty === 'hard') {
            return 250
        }
        if (this.difficulty === 'insane'){
            return 400
        }
    },
    gameLost: function () { //kills the gameRun
        if (this.isMatch === false) {
            $('#game-status-markers').append(`<h1 class="loss">GAME OVER, BETTER LUCK NEXT TIME</h1>`)
            GameRun.inertAllQuads();
            setTimeout(function () {
                playGameOver();
            }, 600)
        }
    }
}

//turn generator object
const GameRun = {
    sequenceNumGenerate: function () {
        const quadNumber = Math.ceil(Math.random() * 4)
        return quadNumber
    },
    computerSimonSequence: function () {
        const selection = this.sequenceNumGenerate();
        foundation.computerArray.push(selection)
    },
    insaneSequence: function() {
        for(let i = 0; i <= foundation.insaneLength-1; i++){
        const selection = this.sequenceNumGenerate();
        foundation.computerArray.push(selection) 
        }
    },
    sequenceFlash: function () {
        for (let i = 0; i <= foundation.computerArray.length; i++) {
            if (foundation.computerArray.length > 0) {
                setTimeout(function () {
                    FlasherGroup.onOffQuadrant(foundation.computerArray[i])
                }, (foundation.currentTimeSet() + (foundation.currentTimeSet() / 5)) * i)
            }
        }
    },
    inertAllQuads: function () {
        $('.simon-selector-1, .simon-selector-2, .simon-selector-3, .simon-selector-4').addClass("quads-while-running")
    },
    bringBackAllQuads: function () {
        $('.simon-selector-1, .simon-selector-2, .simon-selector-3, .simon-selector-4').removeClass("quads-while-running")
    },
    computerInitiate: function () {
        if (foundation.isMatch === true && foundation.insaneMode === false) {
            this.inertAllQuads();
            this.computerSimonSequence();
            console.log(foundation.computerArray)
            this.sequenceFlash();
            setTimeout(function () {
                GameRun.bringBackAllQuads()
            }, foundation.currentTimeSet() * foundation.computerArray.length)
        }
        if (foundation.isMatch === true && foundation.insaneMode === true){
            this.inertAllQuads();
            foundation.computerArray = []
            foundation.insaneLength++
            this.insaneSequence();
            console.log(foundation.computerArray)
            this.sequenceFlash();
            setTimeout(function () {
                GameRun.bringBackAllQuads()
            }, foundation.currentTimeSet() * foundation.computerArray.length)
        }
    },
    checkAgainst: function () {

        const iterationSelector = foundation.playerArray.length - 1
        if (foundation.playerArray[iterationSelector] === foundation.computerArray[iterationSelector]) {
            if (foundation.playerArray.length === foundation.computerArray.length) {
                $('.quadrant').fadeOut('fast')
                playPatternSuccess()
                skillUpdate(foundation.computerArray.length);
                foundation.playerArray = []
                if (foundation.bestScore < foundation.computerArray.length) {
                    $('#score-number').html(foundation.computerArray.length)
                    foundation.bestScore++
                }
                setTimeout(function () {
                    $('#level-number').html(foundation.computerArray.length + 1)
                    $('.quadrant').fadeIn('fast')
                }, 1000)
                setTimeout(function () {
                    GameRun.computerInitiate()
                }, 2000)
            }
        } else {
            foundation.isMatch = false
            foundation.gameLost();
        }
    },
    clickRun: function (number) {
        FlasherGroup.onOffQuadrant(number);
        foundation.playerArray.push(number)
        GameRun.checkAgainst()
    },
} //end of GameRun


//globally present selector options
$('.simon-selector-1').click(function () {
    GameRun.clickRun(1)
})
$('.simon-selector-2').click(function () {
    GameRun.clickRun(2)
})
$('.simon-selector-3').click(function () {
    GameRun.clickRun(3)
})
$('.simon-selector-4').click(function () {
    GameRun.clickRun(4)
})


//visual sequence indication object
const FlasherGroup = {
    selectIndicator: function (selectorNumber) {
        if (selectorNumber === 1) {
            $('.simon-selector-1').addClass("quadrant-selected pulse")
            play1();
        }
        if (selectorNumber === 2) {
            $('.simon-selector-2').addClass("quadrant-selected pulse")
            play2();
        }
        if (selectorNumber === 3) {
            $('.simon-selector-3').addClass("quadrant-selected pulse")
            play3();
        }
        if (selectorNumber === 4) {
            $('.simon-selector-4').addClass("quadrant-selected pulse")
            play4();
        }
    },
    unIndicate: function (selectorNumber) {
        if (selectorNumber === 1) {
            $('.simon-selector-1').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 2) {
            $('.simon-selector-2').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 3) {
            $('.simon-selector-3').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 4) {
            $('.simon-selector-4').removeClass("quadrant-selected pulse")
        }
    },

    onOffQuadrant: function (selectorNumber) {
        this.selectIndicator(selectorNumber)
        setTimeout(function () {
            FlasherGroup.unIndicate(selectorNumber)
        }, foundation.currentTimeSet())
    }

} 

//globally present game start
$('#start-button').click(function () {
    setTimeout(function () {
        GameRun.computerInitiate()
    }, 800)
    $('#start-button').addClass("quads-while-running start-on-click")
    setTimeout(function () {
        $('#start-button').removeClass("start-on-click")
    }, 100)
    $('#diff-toggle').addClass("quads-while-running")
})

//globally present refresh to Game Foundation
$('#reset').click(function () {
    $('#reset').addClass("reset-on-click")
    setTimeout(function () {
        $('#reset').removeClass("reset-on-click")
    }, 100)
    foundation.difficulty = 'easy'
    foundation.gameLevel = 1
    foundation.isMatch = true
    foundation.playerArray = []
    foundation.computerArray = []
    $('#start-button').removeClass("quads-while-running")
    $('.loss').remove()
    $('#level-number').html(1)
    $('#diff-select').html('Easy')
    $('#diff-select').removeClass('diff-insane')
    foundation.insaneMode = false
    foundation.insaneLength = 0
    $('#diff-select').removeClass('diff-hard')
    $('#diff-select').removeClass('diff-medium')
    $('#diff-select').addClass('diff-easy')
    $('#diff-toggle').removeClass("quads-while-running")
    $('.simon-selector-1, .simon-selector-2, .simon-selector-3, .simon-selector-4').addClass("quads-while-running")
})

//Change options for speed and audio
$('#diff-toggle').click(function () {
    $('#diff-toggle').addClass("toggle-on-click")
    setTimeout(function () {
        $('#diff-toggle').removeClass("toggle-on-click")
    }, 100)
    if (foundation.difficulty === 'easy') {
        $('#diff-select').html('Medium')
        $('#diff-select').removeClass('diff-easy')
        $('#diff-select').addClass('diff-medium')
        foundation.difficulty = 'medium'
    } else if (foundation.difficulty === 'medium') {
        $('#diff-select').html('Hard')
        $('#diff-select').removeClass('diff-medium')
        $('#diff-select').addClass('diff-hard')
        foundation.difficulty = 'hard'
    } 
    else if (foundation.difficulty === 'hard') {
        $('#diff-select').html('INSANE')
        $('#diff-select').removeClass('diff-hard')
        $('#diff-select').addClass('diff-insane')
        foundation.insaneMode = true; 
        foundation.difficulty = 'insane'
    }
    else if (foundation.difficulty === 'insane') {
        $('#diff-select').html('Easy')
        $('#diff-select').removeClass('diff-insane')
        $('#diff-select').addClass('diff-easy')
        foundation.insaneMode = false;
        foundation.difficulty = 'easy'
    }  
})

//clickable toggle for instructions
$('.info-hov').click(function(){
    $('.info-text').css("visibility", "visible")
    $('.info-hov').mouseout(function(){
        $('.info-text').css("visibility", "hidden")
    })
})

//audio presets
let audio1 = new Audio('./sounds/guitar-1.wav');
let audio1f = new Audio('./sounds/guitar-1f.wav');
let audio1i = new Audio('./sounds/quoteBlue.m4a');

function play1() {
    if (foundation.difficulty === 'easy'){
    audio1.play();
    }
    if (foundation.difficulty === 'hard'|| foundation.difficulty === 'medium'){
        audio1f.play();
        }
    if (foundation.difficulty === 'insane'){
            audio1i.play();
        }
}
let audio2 = new Audio('./sounds/guitar-2.wav');
let audio2f = new Audio('./sounds/guitar-2f.wav');
let audio2i = new Audio('./sounds/quoteGreen.m4a');

function play2() {
    if (foundation.difficulty === 'easy'){
        audio2.play();
        }
        if (foundation.difficulty === 'hard'|| foundation.difficulty === 'medium'){
            audio2f.play();
            }
    if (foundation.difficulty === 'insane'){
                audio2i.play();
            }
}
let audio3 = new Audio('./sounds/guitar-3.wav');
let audio3f = new Audio('./sounds/guitar-3f.wav');
let audio3i = new Audio('./sounds/quoteRed.m4a');

function play3() {
    if (foundation.difficulty === 'easy'){
        audio3.play();
        }
        if (foundation.difficulty === 'hard'|| foundation.difficulty === 'medium'){
            audio3f.play();
            }
    if (foundation.difficulty === 'insane'){
                audio3i.play();
            }
}
let audio4 = new Audio('./sounds/guitar-4.wav');
let audio4f = new Audio('./sounds/guitar-4f.wav');
let audio4i = new Audio('./sounds/quoteYellow.m4a');

function play4() {
    if (foundation.difficulty === 'easy'){
        audio4.play();
        }
        if (foundation.difficulty === 'hard'|| foundation.difficulty === 'medium'){
            audio4f.play();
            }
    if (foundation.difficulty === 'insane'){
                audio4i.play();
            }
}
let audio5 = new Audio('./sounds/quick-guitar.wav');

function playGameOver() {
    audio5.play();
}

let audio6 = new Audio('./sounds/brick-fall.wav')

function playPatternSuccess() {
     setTimeout(function(){audio6.play()},500)
}


//game progress commenting presets
function skillUpdate (length) {
    if (length > 1){
        $('.skill-response').html("Getting it Going")
    }
    if (length > 3){
        $('.skill-response').html("Simon Novice")
    }
    if (length > 7){
        $('.skill-response').html("Showing Promise")
    }
    if (length > 11){
        $('.skill-response').html("You heave some real skill")
    }
    if (length > 15){
        $('.skill-response').html("Dominating!")
    }
    if (length > 20){
        $('.skill-response').html("Simon Master!")
    }
    if (length > 24){
        $('.skill-response').html("Unreal!")
    }
}