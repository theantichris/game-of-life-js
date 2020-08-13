const dead = 0;

export function topLeftNeighbor(row, col, currentGeneration){
    let x = row - 1;
    let y = col - 1;
    
      if (x >= 0 && y >= 0) {
          return currentGeneration[x][y];
    }
    
    return dead
}

export function topNeighbor(row, col, currentGeneration) {
    let x = row - 1;
    let y = col;

        if (x >= 0) {
            return currentGeneration[x][y];
    }

    return dead;
}

export function topRightNeighbor(row, col, colCount, currentGeneration){
    let x = row - 1;
    let y = col + 1;

        if (x >= 0 && y < colCount) {
            return currentGeneration[x][y];
    }

    return dead;
}

export function leftNeighbor(row, col, currentGeneration){
    let x = row;
    let y = col - 1;

        if (y >= 0) {
            return currentGeneration[x][y];
    }

    return dead
}

export function rightNeighbor(row, col, colCount, currentGeneration){
    let x = row;
    let y = col + 1;

        if (y < colCount) {
            return currentGeneration[x][y];
    }

    return dead
}

export function bottomLeftNeighbor(row, col, rowCount, currentGeneration) {
    let x = row + 1;
    let y = col - 1;

        if (x < rowCount && y >= 0) {
            return currentGeneration[x][y];
    }

    return dead;
}

export function bottomNeighbor(row, col, rowCount, currentGeneration){
    let x = row + 1;
    let y = col;

        if (x + 1 < rowCount) {
            return currentGeneration[x][y];
    }

    return dead;
}

export function bottomRightNeighbor(row, col, rowCount, colCount, currentGeneration){
    let x = row + 1;
    let y = col + 1;

        if (x < rowCount && y < colCount) {
            return currentGeneration[x][y];
    }

    return dead
}