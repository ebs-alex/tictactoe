

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => cell.addEventListener("click", () => cellclicked(cell.id)))


function cellclicked(cellID) {
    alert(cellID)
}