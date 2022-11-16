const squareRegistry = new Map();

const ChessLocation = (x, y) => {
    const xPosition = x
    const yPosition = y
    let predecessor;

    const knightOptions = [
        [1, 2], [2, 1],
        [-1, 2], [2, -1],
        [1, -2], [-2, 1],
        [-1, -2], [-2, -1]
    ]

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPredecessor) => {
        predecessor = predecessor || newPredecessor;
    }

    const coordinates = () => `${x}, ${y}`

    const createKnightMoves = () => {
        return knightOptions
            .map((offset) => newSquareFrom(offset[0], offset[1]))
            .filter((square) => square !== undefined);
    }

    const newSquareFrom = (xOffset, yOffset) => {
        const [newX, newY] = [xPosition + xOffset, yPosition + yOffset];
        if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
            return ChessLocation(newX, newY);
        }
    }

    if (squareRegistry.has(coordinates())) {
        return squareRegistry.get(coordinates());
    } else {
        newSquare = { coordinates, getPredecessor, setPredecessor, createKnightMoves }
        squareRegistry.set(coordinates(), newSquare);
        return newSquare;
    }
}

const knightsTravails = (start, finish) => {
    squareRegistry.clear()

    const origin = ChessLocation(...start);
    const target = ChessLocation(...finish);

    const queue = [origin];
    while (!queue.includes(target)) {
        const currentSquare = queue.shift();

        const queueList = currentSquare.createKnightMoves();
        queueList.forEach((square) => square.setPredecessor(currentSquare));
        queue.push(...queueList);
    }

    const path = [target]
    while (!path.includes(origin)) {
        const prevSquare = path[0].getPredecessor();
        path.unshift(prevSquare);
    }
    console.log(`The shortest path was ${path.length - 1} total moves!`);
    console.log("The moves were as follows:");
    path.forEach(square => console.log(square.coordinates()));
}

module.exports = knightsTravails