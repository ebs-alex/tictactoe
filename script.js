




const gameEngine = (function(){

    let x = ''

    function registerTurn(turn, cell) {
        x = turn;
        console.log(turn);
        console.log(cell.id);
    }



    return {registerTurn}

})();


const board = (function(){
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => cell.addEventListener("click", () => cellClicked(cell)));
    let turnSpan = document.querySelector("#turnSpan");
    let turn = "X";
    turnSpan.textContent = turn;

    function cellClicked(cell) {
        if (cellUnoccupied(cell)) {
            markCell(cell);
            changeTurn()
        } else {
            alert("that cell is already occupied!")
        }
    }

    function markCell(cell) {
        cell.textContent = turn;
        gameEngine.registerTurn(turn, cell)
        console.log(gameEngine.x)
    }

    function changeTurn() {
        if (turn == "X") {
            turn = "O"
        } else {
            turn = "X"
        }
        turnSpan.textContent = turn;
    }

    function cellUnoccupied(cell) {
        if (cell.textContent) {
            return false
        } else {
            return true
        }
    }
})();

