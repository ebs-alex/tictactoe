
const board = (function(){

    let cells, turn, turnSpan, xWins, oWins;

     function init() {
        xWins = document.querySelector("#xWins");
        oWins = document.querySelector("#oWins");
        xWins.textContent = "0"
        oWins.textContent = "0"
        cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => cell.addEventListener("click", () => cellClicked(cell)));
        turnSpan = document.querySelector("#turnSpan");
        turn = "X";
        turnSpan.textContent = turn;
        gameEngine.initialize(cells);
    }

    function cellClicked(cell) {
        if (!cell.textContent) {
            markCell(cell);
            changeTurn()
        } else {
            alert("that cell is already occupied!")
        }
    }

    function markCell(cell) {
        cell.textContent = turn;
        gameEngine.registerTurn(turn, cell)
    }

    function changeTurn() {
        turn = (turn === "X") ? "O" : "X";
        turnSpan.textContent = turn;
    }

    function resetBoard() {
        // console.log("RESET BOARD")
        cells.forEach((cell)=> {
            cell.textContent = "";
        })
        turn = "X";
        turnSpan.textContent = turn
        gameEngine.initialize(cells);
    }

    function scoreWin(winner) {
        if (winner == "X") {
            let newScore = Number(xWins.textContent);
            newScore++;
            xWins.textContent = newScore
        } else if (winner == "O"){
            let newScore = Number(oWins.textContent);
            newScore++;
            oWins.textContent = newScore
        }
    }

    return { init, resetBoard, scoreWin }

})();


const gameEngine = (function(cells){

    let winPresent = false;
    let gameCells = [];
    let xMarks = []
    let oMarks = []
    let winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    function initialize(boardCells) {
        boardCells.forEach((cell) => {
            let newCell = {
                cellMark: "",
                id: cell.id
            }
            gameCells.push(newCell)
        })
    }

    function registerTurn(turn, selectedCell) {
        for (c of gameCells) {
            if (c.id == selectedCell.id && c.cellMark == "") {
                c.cellMark = turn;
                if (turn == "X") {
                    xMarks.push(Number(c.id))
                    xMarks.sort((a, b) => (a - b));
                } else {
                    oMarks.push(Number(c.id))
                    oMarks.sort((a, b) => (a - b));
                }
            } else {
               
            }
        }
        analyzeTurn(turn)
        checkMaxTurns();
    }

    
    function checkMaxTurns() {
        console.log(`checkMaxTurns function`)
        let spacesAvailable  = []
        for (c of gameCells) {
            spacesAvailable.push(c.cellMark)
        }
        if (!winPresent) {
            if (!spacesAvailable.includes("") && spacesAvailable.length > 0) {
                console.log('max turns if loop, win present status:')
                console.log(winPresent)
                tieGame()
            }
        }
        
        winPresent = false;
    }

    function analyzeTurn(turn) {

        if (turn=="X") {
            winningCombos.forEach((combo) => {
                let comboCount = 0
                for (n of combo) {
                    if (xMarks.includes(n)) {
                        comboCount++
                    } else {
                        continue
                    }
                    if (comboCount == 3) {
                        console.log(`analyzed an X win`)
                        board.scoreWin("X")
                        gameOver("X");
                    }
                }
            })
        } else {
            winningCombos.forEach((combo) => {
                let comboCount = 0
                for (n of combo) {
                    if (oMarks.includes(n)) {
                        comboCount++
                    } else {
                        continue
                    }
                    if (comboCount == 3) {
                        board.scoreWin("O")
                        gameOver("O");
                    }
                }
            })
        }
        
    }

    function gameOver(winner) {
        console.log(`game over function`)
        winPresent = true;

        setTimeout(function () {
            if (winner == "X") {
                alert(`Game Over.\n Winner Player ${winner}`)
            } else {
                alert(`Game Over.\n Winner Player ${winner}`)
            } 
            console.log(winPresent)
            resetGame()
        }, 500);
    }

    function tieGame() {
        setTimeout(function () {
            alert(`Game Over - TIE GAME`)
            console.log("TIE GAME function")
            resetGame()
        }, 500);
    }

    function resetGame() {
        console.log("RESET GAME function")
        console.log(winPresent)
        gameCells = [];
        xMarks = []
        oMarks = []
        spacesAvailable = []
        board.resetBoard()
    }

    return { initialize, registerTurn }

})();


board.init();