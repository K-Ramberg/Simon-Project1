const gameFoundationState = {
    difficulty: 'easy',
    computerSequenceArray: [],
    playerSelectionSequence: [],
    gameLevel: 1,
    isMatch: true,
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
            $('.container').html(`<h1>GAME OVER, BETTER LUCK NEXT TIME</h1>`)
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
        gameFoundationState.computerSequenceArray.push(selection)
    },

    sequenceFlash: function () {
        for (let i = 0; i <= gameFoundationState.computerSequenceArray.length; i++) {
            if (gameFoundationState.computerSequenceArray.length > 0) {
                setTimeout(function () {
                    FlasherGroup.onOffQuadrant(gameFoundationState.computerSequenceArray[i])
                }, (gameFoundationState.currentTimeSet() + (gameFoundationState.currentTimeSet() / 5)) * i)
            }
        }
    },
    inertAllQuads: function () {
        $('#simon-selector-1, #simon-selector-2, #simon-selector-3, #simon-selector-4').addClass("quads-while-running")
    },
    bringBackAllQuads: function () {
        $('#simon-selector-1, #simon-selector-2, #simon-selector-3, #simon-selector-4').removeClass("quads-while-running")
    },
    computerInitiate: function () {
        if (gameFoundationState.isMatch === true) {
            this.inertAllQuads();
            this.computerSimonSequence();
            this.sequenceFlash();
            this.bringBackAllQuads();
            this.userSelecting();
        }
    },
    checkAgainst: function () {

        const iterationSelector = gameFoundationState.playerSelectionSequence.length - 1
        if (gameFoundationState.playerSelectionSequence[iterationSelector] === gameFoundationState.computerSequenceArray[iterationSelector]) {
            console.log("CORRECT")
            if (gameFoundationState.playerSelectionSequence.length === gameFoundationState.computerSequenceArray.length) {
                console.log("registering the length is equal")
                gameFoundationState.playerSelectionSequence = []
                setTimeout(function () {
                    GameRun.computerInitiate()
                }, 3000)
                console.log("then " + gameFoundationState.playerSelectionSequence)
            } else {
                if (gameFoundationState.playerSelectionSequence.length < gameFoundationState.computerSequenceArray.length) {
                    console.log('is pushing through to another selection')
                    this.userSelecting()
                }
            }
        } else {
            gameFoundationState.isMatch = false
            gameFoundationState.gameLost();
            console.log("thinks its wrong")
        }
    },
    userSelecting: function () {
        if (gameFoundationState.playerSelectionSequence.length < gameFoundationState.computerSequenceArray.length) {
            $('#simon-selector-1').click(function () {
                GameRun.clickRun(1)
            })
            $('#simon-selector-2').click(function () {
                GameRun.clickRun(2)
            })
            $('#simon-selector-3').click(function () {
                GameRun.clickRun(3)
            })
            $('#simon-selector-4').click(function () {
                GameRun.clickRun(4)
            })
        }
    },

    //if (gameFoundationState.playerSelectionSequence.length < gameFoundationState.computerSequenceArray.length){

    clickRun: function (number) {
        FlasherGroup.onOffQuadrant(number);
        gameFoundationState.playerSelectionSequence.push(number)
        console.log("first " + gameFoundationState.playerSelectionSequence)
        GameRun.checkAgainst()
    },

} // end of gameRun





const FlasherGroup = {
    selectIndicator: function (selectorNumber) {
        if (selectorNumber === 1) {
            $('#simon-selector-1').addClass("quadrant-selected pulse")
        }
        if (selectorNumber === 2) {
            $('#simon-selector-2').addClass("quadrant-selected pulse")
        }
        if (selectorNumber === 3) {
            $('#simon-selector-3').addClass("quadrant-selected pulse")
        }
        if (selectorNumber === 4) {
            $('#simon-selector-4').addClass("quadrant-selected pulse")
        }
    },
    unIndicate: function (selectorNumber) {
        if (selectorNumber === 1) {
            $('#simon-selector-1').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 2) {
            $('#simon-selector-2').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 3) {
            $('#simon-selector-3').removeClass("quadrant-selected pulse")
        }
        if (selectorNumber === 4) {
            $('#simon-selector-4').removeClass("quadrant-selected pulse")
        }
    },

    onOffQuadrant: function (selectorNumber) {
        this.selectIndicator(selectorNumber);
        setTimeout(function () {
            FlasherGroup.unIndicate(selectorNumber)
        }, gameFoundationState.currentTimeSet())
    }

}






$('#start-button').click(function () {
    setTimeout(function () {
        GameRun.computerInitiate()
    }, 800)
    $('#start-button').addClass("quads-while-running")
})

$('#reset').click(function(){
    gameFoundationState.difficulty = 'easy'
    gameFoundationState.gameLevel = 1
    gameFoundationState.isMatch = true
    gameFoundationState.playerSelectionSequence = []
    gameFoundationState.computerSequenceArray = []
    $('#start-button').removeClass("quads-while-running")
    $('.container').html(` <div class="row" id="gameboard-first-row">
    <div class="col s6 hoverable quadrant quads-while-running" id="simon-selector-1">1</div>
    <div class="col s6 hoverable quadrant quads-while-running" id="simon-selector-2">2</div>
</div>
<div class="row" id="gameboard-second-row">
    <div class="col s6 hoverable quadrant quads-while-running" id="simon-selector-3">3</div>
    <div class="col s6 hoverable quadrant quads-while-running" id="simon-selector-4">4</div>
</div>`)
})