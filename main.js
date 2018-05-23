const gameFoundation = {
    difficulty: 'easy',
    computerArray: [],
    playerArray: [],
    isMatch: true,
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
    },
    gameLost: function () {
        if (this.isMatch === false) {
            $('#game-status-markers').append(`<h1 class="loss">GAME OVER, BETTER LUCK NEXT TIME</h1>`)
            setTimeout(function () {
                play5();
            }, 600)
        }
    }
}


const GameRun = {
    sequenceNumGenerate: function () {
        const quadNumber = Math.ceil(Math.random() * 4)
        return quadNumber
    },
    computerSimonSequence: function () {
        const selection = this.sequenceNumGenerate();
        gameFoundation.computerArray.push(selection)
    },

    sequenceFlash: function () {
        for (let i = 0; i <= gameFoundation.computerArray.length; i++) {
            if (gameFoundation.computerArray.length > 0) {
                setTimeout(function () {
                    FlasherGroup.onOffQuadrant(gameFoundation.computerArray[i])
                }, (gameFoundation.currentTimeSet() + (gameFoundation.currentTimeSet() / 5)) * i)
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
        if (gameFoundation.isMatch === true) {
            this.inertAllQuads();
            this.computerSimonSequence();
            this.sequenceFlash();
            setTimeout(function () {
                GameRun.bringBackAllQuads()
            }, gameFoundation.currentTimeSet() * gameFoundation.computerArray.length)
        }
    },
    checkAgainst: function () {

        const iterationSelector = gameFoundation.playerArray.length - 1
        if (gameFoundation.playerArray[iterationSelector] === gameFoundation.computerArray[iterationSelector]) {
            console.log("CORRECT")
            if (gameFoundation.playerArray.length === gameFoundation.computerArray.length) {
                $('.quadrant').fadeOut('fast')
                gameFoundation.playerArray = []
                if (gameFoundation.bestScore < gameFoundation.computerArray.length) {
                    $('#score-number').html(gameFoundation.computerArray.length)
                    gameFoundation.bestScore++
                }
                setTimeout(function () {
                    $('#level-number').html(gameFoundation.computerArray.length + 1)
                    $('.quadrant').fadeIn('fast')
                }, 1000)
                setTimeout(function () {
                    GameRun.computerInitiate()
                }, 2000)
                console.log("then the array is " + gameFoundation.playerArray)
            }
        } else {
            gameFoundation.isMatch = false
            gameFoundation.gameLost();
            console.log("thinks its wrong")
        }
    },
    clickRun: function (number) {
        FlasherGroup.onOffQuadrant(number);
        gameFoundation.playerArray.push(number)
        console.log("first this array is " + gameFoundation.playerArray)
        GameRun.checkAgainst()
    },
} // end of gameRun

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
        }, gameFoundation.currentTimeSet())
    }

} //end of flasher group


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

$('#reset').click(function () {
    $('#reset').addClass("reset-on-click")
    setTimeout(function () {
        $('#reset').removeClass("reset-on-click")
    }, 100)
    gameFoundation.difficulty = 'easy'
    gameFoundation.gameLevel = 1
    gameFoundation.isMatch = true
    gameFoundation.playerArray = []
    gameFoundation.computerArray = []
    $('#start-button').removeClass("quads-while-running")
    $('.loss').remove()
    $('#level-number').html(1)
    $('#diff-select').html('Easy')
    $('#diff-toggle').removeClass("quads-while-running")
    $('.simon-selector-1, .simon-selector-2, .simon-selector-3, .simon-selector-4').addClass("quads-while-running")
})

$('#diff-toggle').click(function () {
    $('#diff-toggle').addClass("toggle-on-click")
    setTimeout(function () {
        $('#diff-toggle').removeClass("toggle-on-click")
    }, 100)
    if (gameFoundation.difficulty === 'easy') {
        $('#diff-select').html('Medium')
        $('#diff-select').removeClass('diff-easy')
        $('#diff-select').addClass('diff-medium')
        gameFoundation.difficulty = 'medium'
    } else if (gameFoundation.difficulty === 'medium') {
        $('#diff-select').html('Hard')
        $('#diff-select').removeClass('diff-medium')
        $('#diff-select').addClass('diff-hard')
        gameFoundation.difficulty = 'hard'
    } else if (gameFoundation.difficulty === 'hard') {
        $('#diff-select').html('Easy')
        $('#diff-select').removeClass('diff-hard')
        $('#diff-select').addClass('diff-easy')
        gameFoundation.difficulty = 'easy'
    }
})

$('.info-hov').click(function(){
    $('.info-text').css("visibility", "visible")
    $('.info-hov').mouseout(function(){
        $('.info-text').css("visibility", "hidden")
    })
})


var audio = new Audio('./sounds/quick-drill.mov');

function play1() {
    audio.play();
}
var audio2 = new Audio('./sounds/quick-saw.wav');

function play2() {
    audio2.play();
}
var audio3 = new Audio('./sounds/quick-hammer.wav');

function play3() {
    audio3.play();
}
var audio4 = new Audio('./sounds/quick-gun.wav');

function play4() {
    audio4.play();
}
var audio5 = new Audio('');

function play5() {
    audio5.play();
}