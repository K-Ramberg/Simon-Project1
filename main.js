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
            GameRun.inertAllQuads();
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
        }
    },
    checkAgainst: function () {
        if (gameFoundationState.playerSelectionSequence[gameFoundationState.playerSelectionSequence.length-1] !== gameFoundationState.computerSequenceArray[gameFoundationState.playerSelectionSequence-1]) {
            gameFoundationState.isMatch = false
            gameFoundationState.gameLost();
        }
    },
    userSelecting : function(){

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



$('#simon-selector-1').click(function () {
    FlasherGroup.onOffQuadrant(1);
    gameFoundationState.playerSelectionSequence.push(1)
})
$('#simon-selector-2').click(function () {
    FlasherGroup.onOffQuadrant(2);
    gameFoundationState.playerSelectionSequence.push(2)
})
$('#simon-selector-3').click(function () {
    FlasherGroup.onOffQuadrant(3);
    gameFoundationState.playerSelectionSequence.push(3)
})
$('#simon-selector-4').click(function () {
    FlasherGroup.onOffQuadrant(4);
    gameFoundationState.playerSelectionSequence.push(4)
})


$('#start-button').click(function () {
    GameRun.computerInitiate();
    //$('#start-button').addClass("quads-while-running")
})